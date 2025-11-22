import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getDailyTimeSeries,
  getCompanyOverview,
} from "../../services/alphaVantage";
import { addToPortfolio } from "../portfolio/portfolioSlice";
import PriceChart from "./PriceChart";
import { addToWatchlist } from "../watchlist/watchlistSlice";

function StockDetails() {
  const { symbol } = useParams();
  const dispatch = useDispatch();
  const handleAddToWatchlist = () => {
    if (!overview) return;
    dispatch(
      addToWatchlist({
        symbol,
        name: overview.Name,
      })
    );
  };

  const [overview, setOverview] = useState(null);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [overviewData, seriesData] = await Promise.all([
          getCompanyOverview(symbol),
          getDailyTimeSeries(symbol),
        ]);

        setOverview(overviewData);
        setSeries(seriesData);
      } catch (err) {
        setError(err.message || "Failed to load stock data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [symbol]);

  const latest = series[0];

  const handleAddToPortfolio = () => {
    if (!overview || !latest) return;

    dispatch(
      addToPortfolio({
        symbol,
        name: overview.Name,
        latestPrice: latest.close,
      })
    );
  };

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="text-sm text-emerald-700 hover:text-emerald-600 transition"
      >
        ← Back to search
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-900">
            {symbol}
            {overview?.Name ? (
              <span className="ml-2 text-xl font-normal text-emerald-800">
                — {overview.Name}
              </span>
            ) : null}
          </h1>
          {overview?.Exchange && (
            <p className="text-sm text-emerald-700 mt-1">
              {overview.Exchange} • {overview.Currency}
            </p>
          )}
        </div>

        <button
          onClick={handleAddToPortfolio}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 transition"
        >
          Add to Portfolio
        </button>
        <button
          onClick={handleAddToWatchlist}
          className="inline-flex items-center justify-center rounded-md border border-emerald-400 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 dark:text-emerald-200 dark:border-emerald-500 dark:hover:bg-slate-900 transition"
        >
          ☆ Add to Watchlist
        </button>
      </div>

      {loading && <p className="text-emerald-800">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Top cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {latest && (
              <div className="rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                <h2 className="text-lg font-semibold mb-2 text-emerald-900">
                  Latest Price
                  <span className="block text-xs font-normal text-emerald-700">
                    Date: {latest.date}
                  </span>
                </h2>
                <dl className="space-y-1 text-sm text-emerald-800">
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Open</dt>
                    <dd>{latest.open.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">High</dt>
                    <dd>{latest.high.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Low</dt>
                    <dd>{latest.low.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Close</dt>
                    <dd>{latest.close.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Volume</dt>
                    <dd>{latest.volume.toLocaleString()}</dd>
                  </div>
                </dl>
              </div>
            )}

            {overview && (
              <div className="rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
                <h2 className="text-lg font-semibold mb-2 text-emerald-900">
                  Company Overview
                </h2>
                <dl className="space-y-1 text-sm text-emerald-800">
                  <div>
                    <dt className="text-emerald-700">Sector</dt>
                    <dd className="font-medium">{overview.Sector}</dd>
                  </div>
                  <div>
                    <dt className="text-emerald-700">Industry</dt>
                    <dd className="font-medium">{overview.Industry}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">Market Cap</dt>
                    <dd>{overview.MarketCapitalization}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">52W High</dt>
                    <dd>{overview["52WeekHigh"]}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">52W Low</dt>
                    <dd>{overview["52WeekLow"]}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-emerald-700">PE Ratio</dt>
                    <dd>{overview.PERatio}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          {/* Recent prices table */}
          {series.length > 0 && (
            <div className="rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
              <h2 className="text-lg font-semibold mb-3 text-emerald-900">
                Recent Daily Prices (Last 5 Days)
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-emerald-900">
                  <thead>
                    <tr className="border-b border-emerald-200 text-left text-xs uppercase tracking-wide text-emerald-700">
                      <th className="py-2 pr-3">Date</th>
                      <th className="py-2 pr-3 text-right">Open</th>
                      <th className="py-2 pr-3 text-right">High</th>
                      <th className="py-2 pr-3 text-right">Low</th>
                      <th className="py-2 pr-3 text-right">Close</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {series.slice(0, 5).map((day) => (
                      <tr key={day.date}>
                        <td className="py-2 pr-3">{day.date}</td>
                        <td className="py-2 pr-3 text-right">
                          {day.open.toFixed(2)}
                        </td>
                        <td className="py-2 pr-3 text-right">
                          {day.high.toFixed(2)}
                        </td>
                        <td className="py-2 pr-3 text-right">
                          {day.low.toFixed(2)}
                        </td>
                        <td className="py-2 pr-3 text-right">
                          {day.close.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chart */}
          {series.length > 0 && <PriceChart data={series} />}
        </>
      )}
    </div>
  );
}

export default StockDetails;
