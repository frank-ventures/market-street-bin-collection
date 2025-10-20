export async function getBinsFromAPI() {
  const myUprn = 100030122871;
  const withOrWithoutXmas = "one-year-collection-dates";
  const url = `https://www.erewash.gov.uk/bbd-whitespace/${withOrWithoutXmas}?uprn=${myUprn}`;

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

    const data = await response.json();
    const binArray = Object.values(data[0].settings.collection_dates);

    return binArray;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

//    {
//       date: '2026-09-28',
//       timestamp: 1790550000,
//       day: 'Monday',
//       service: 'Domestic Waste Collection Service',
//       'service-identifier': 'domestic-waste-collection-service'
//     }

// domestic-waste-collection-service
// christmas-collection-dates
// recycling-collection-service
// garden-waste-collection-service
