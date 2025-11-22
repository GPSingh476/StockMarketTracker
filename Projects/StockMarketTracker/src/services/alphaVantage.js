const API_BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

// Search for stock symbols
export async function searchStocks(keyword) {
  if (!API_KEY) {
    throw new Error("Missing Alpha Vantage API key");
  }

  const url = `${API_BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
    keyword
  )}&apikey=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch from Alpha Vantage");
  }

  const data = await res.json();

  // 🚨 Handle rate limit or errors
  if (data.Note) {
    throw new Error("API limit reached. Please wait a minute and try again.");
  }
  if (data["Error Message"]) {
    throw new Error("API error: " + data["Error Message"]);
  }

  console.log("searchStocks response:", data); 

  const matches = data.bestMatches || [];

  return matches.map((item) => ({
    symbol: item["1. symbol"],
    name: item["2. name"],
    type: item["3. type"],
    region: item["4. region"],
    marketOpen: item["5. marketOpen"],
    marketClose: item["6. marketClose"],
    timezone: item["7. timezone"],
    currency: item["8. currency"],
    matchScore: item["9. matchScore"],
  }));
}

export async function getDailyTimeSeries(symbol) {
  if (!API_KEY) throw new Error("Missing Alpha Vantage API key");

  const url = `${API_BASE_URL}?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(
    symbol
  )}&outputsize=compact&apikey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch time series data");

  const data = await res.json();

  // 🚨 Handle rate limit or errors
  if (data.Note) {
    throw new Error("API limit reached. Please wait a minute and try again.");
  }
  if (data["Error Message"]) {
    throw new Error("API error: " + data["Error Message"]);
  }

  const series = data["Time Series (Daily)"];
  if (!series) throw new Error("No time series data available");

  const points = Object.entries(series).map(([date, values]) => ({
    date,
    open: Number(values["1. open"]),
    high: Number(values["2. high"]),
    low: Number(values["3. low"]),
    close: Number(values["4. close"]),
    volume: Number(values["5. volume"]),
  }));

  points.sort((a, b) => (a.date < b.date ? 1 : -1));

  return points;
}

export async function getCompanyOverview(symbol) {
  if (!API_KEY) throw new Error("Missing Alpha Vantage API key");

  const url = `${API_BASE_URL}?function=OVERVIEW&symbol=${encodeURIComponent(
    symbol
  )}&apikey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch company overview");

  const data = await res.json();

  if (data.Note) {
    throw new Error("API limit reached. Please wait a minute and try again.");
  }
  if (data["Error Message"]) {
    throw new Error("API error: " + data["Error Message"]);
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error("No overview data available");
  }

  return data;
}
