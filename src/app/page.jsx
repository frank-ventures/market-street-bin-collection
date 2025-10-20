import { getBinsFromAPI } from "@/lib/getBins";

const binData = await getBinsFromAPI();

export default function Home() {
  function getCollectionCategory(label) {
    const map = {
      "domestic-waste-collection-service": "domestic",
      "christmas-collection-dates": "christmas",
      "recycling-collection-service": "recycling",
      "garden-waste-collection-service": "garden",
    };

    return map[label] || "unknown";
  }

  return (
    <>
      <h1 className="text-5xl p-4 text-center">WHAT BIN IS IT?</h1>
      {binData.map((month) => {
        return month.map((binDate) => {
          // Check API date vs current date
          const thisBinDate = new Date(binDate.date);
          thisBinDate.setUTCHours(0, 0, 0, 0);
          const currentDate = new Date();
          currentDate.setUTCHours(0, 0, 0, 0);

          const doesDateMatch = thisBinDate.getTime() == currentDate.getTime();

          const label = getCollectionCategory(binDate["service-identifier"]);

          return thisBinDate >= currentDate ? (
            <section
              className={` ${binDate["service-identifier"]} p-2 relative`}
            >
              <article
                className={`backdrop-opacity-80 bg-slate-400/35 p-2 rounded-2xl`}
              >
                <div
                  className={`${
                    doesDateMatch ? `text-blue-400 font-bold` : ``
                  } flex gap-4`}
                >
                  <p
                    key={
                      binDate.timestamp +
                      binDate.day +
                      binDate["service-identifier"]
                    }
                  >
                    {binDate.date}
                  </p>
                  {doesDateMatch && (
                    <p className="text-blue-400 font-bold">That's today!</p>
                  )}
                </div>

                <p>{binDate.day}</p>
                <p>{binDate.service}</p>
              </article>

              <img
                src={`${label}.png`}
                alt=""
                className="max-h-10 absolute right-6 top-8"
              />
            </section>
          ) : (
            ""
          );
        });
      })}
    </>
  );
}
