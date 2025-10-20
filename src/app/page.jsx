import { getBinsFromAPI } from "@/lib/getBins";

const binData = await getBinsFromAPI();

export default function Home() {
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

  return (
    <>
      <header className="relative h-36 flex items-center justify-center">
        <h1 className="text-5xl p-4 text-center z-50 bg-slate-500/50 w-fit rounded-2xl text-white">
          WHAT BIN IS IT?
        </h1>
        <img
          src="what-year-is-it.webp"
          alt=""
          className="w-full absolute top-0 -z-10"
        />
      </header>

      {binData.map((month) => {
        return month.map((binDate) => {
          // Check API date vs current date
          const thisBinDate = new Date(binDate.date);
          thisBinDate.setUTCHours(0, 0, 0, 0);
          const currentDate = new Date();
          currentDate.setUTCHours(0, 0, 0, 0);
          const doesDateMatch = thisBinDate.getTime() == currentDate.getTime();

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
            <section className={`${binDate["service-identifier"]} text-xl p-2`}>
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
                  <p
                    key={
                      binDate.timestamp +
                      binDate.day +
                      binDate["service-identifier"]
                    }
                  >
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
      })}
    </>
  );
}
