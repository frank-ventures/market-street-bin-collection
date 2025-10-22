"use client";
import { getBinsFromAPI } from "@/lib/getBins";
import { useEffect, useState } from "react";

export default function ShowBinData() {
  const [myBins, setMyBins] = useState([]);
  const [loading, setLoading] = useState(true);

  function getCollectionFirstWord(label) {
    const map = {
      "domestic-waste-collection-service": "domestic",
      "christmas-collection-dates": "christmas",
      "recycling-collection-service": "recycling",
      "garden-waste-collection-service": "garden",
    };

    return map[label] || "unknown";
  }

  function getCollectionRenamed(label) {
    const map = {
      "domestic-waste-collection-service": "Black Bin",
      "christmas-collection-dates": "Christmas Collection Dates",
      "recycling-collection-service": "Blue Recycling Bin",
      "garden-waste-collection-service": "Brown Garden Bin",
    };

    return map[label] || "unknown";
  }

  const getBinData = async () => {
    setLoading(true);
    const myBinData = await getBinsFromAPI();
    setMyBins(myBinData);
    setLoading(false);
  };

  useEffect(() => {
    console.log("elo m8");

    getBinData();
    console.log(myBins);
  }, []);

  return (
    <>
      <button
        className="mb-8 ml-auto mr-8 border-8 border-blue-500 border-b-10 border-t-blue-200 border-b-blue-800 bg-blue-300 p-4 rounded-2xl hover:cursor-pointer hover:bg-slate-800 hover:text-slate-300 active:bg-green-500 active:text-green-900 flex gap-4 items-center font-semibold"
        onClick={() => {
          getBinData();
        }}
      >
        Refresh Bins <img src={`refresh-bin.png`} alt="" className="max-h-15" />
      </button>

      {loading ? (
        <p className="bg-blue-600 p-10 text-blue-200 text-4xl rounded-2xl border-l-4 border-r-4 border-b-4 border-l-blue-950 border-r-blue-950 border-b-blue-950">
          Loading!
        </p>
      ) : (
        myBins.map((month) => {
          return month.map((binDate) => {
            // Check API date vs current date
            const thisBinDate = new Date(binDate.date);
            thisBinDate.setUTCHours(0, 0, 0, 0);
            const currentDate = new Date();
            currentDate.setUTCHours(0, 0, 0, 0);
            const doesDateMatch =
              thisBinDate.getTime() == currentDate.getTime();

            // Human readable date string on page
            const dateOptions = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const humanReadableDate = thisBinDate.toLocaleDateString(
              "en-GB",
              dateOptions
            );

            // Renaming some of the data
            const collectionService = getCollectionFirstWord(
              binDate["service-identifier"]
            );
            const renamedCollectionService = getCollectionRenamed(
              binDate["service-identifier"]
            );

            // Let's display it
            return thisBinDate >= currentDate ? (
              <section
                key={
                  binDate.timestamp +
                  binDate.day +
                  binDate["service-identifier"]
                }
                className={`${binDate["service-identifier"]} text-xl p-2 w-full`}
              >
                <article
                  className={`backdrop-opacity-80 bg-slate-400/45 p-2 rounded-2xl flex gap-8 items-center`}
                >
                  <img
                    src={`${collectionService}.png`}
                    alt=""
                    className="max-h-10"
                  />
                  <div
                    className={`${
                      doesDateMatch ? `text-blue-800 font-bold` : ``
                    }  flex flex-col gap-4`}
                  >
                    <p>
                      {humanReadableDate}{" "}
                      {doesDateMatch && (
                        <span className="text-green-400 font-bold ml-2">
                          That's today!
                        </span>
                      )}
                    </p>

                    <p>{renamedCollectionService}</p>
                  </div>
                </article>
              </section>
            ) : (
              ""
            );
          });
        })
      )}
    </>
  );
}
