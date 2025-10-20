import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.json("This is the root route. Move along please");
});

app.get("/bins", async (req, res) => {
  const myUprn = 100030122871;
  const url = `https://www.erewash.gov.uk/bbd-whitespace/one-year-collection-dates?uprn=${myUprn}`;
  console.log("ello m8");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // or use .json() if the response is JSON
    console.log(data[0].settings.collection_dates);
    const binArray = Object.values(data[0].settings.collection_dates);

    res.json(binArray);
  } catch (error) {
    console.error("Fetch error:", error);
  }
});

app.listen(8080, function () {
  console.log("Running on port 8080");
});
