import ShowBinData from "@/components/ShowBinData";
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
      <main className="w-full flex flex-col items-center">
        <ShowBinData />
      </main>
    </>
  );
}
