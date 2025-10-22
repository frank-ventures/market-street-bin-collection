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
      <header className="relative p-4 h-fit flex gap-4 items-center justify-center bg-slate-500/50 rounded-2xl">
        <img
          src="what-year-is-it.webp"
          alt=""
          className="w-3/6 rounded-2xl max-w-[450px]"
        />
        <h1 className="text-3xl sm:text-5xl p-4 text-center text-white">
          WHAT BIN IS IT?
        </h1>
      </header>
      <main className="w-full flex flex-col items-center">
        <ShowBinData />
      </main>
    </>
  );
}
