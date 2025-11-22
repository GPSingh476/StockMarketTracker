import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchStocks } from "../../services/alphaVantage";
import { setSearchResults, setLoading, setError } from "./stocksSlice";

function StockSearch() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.stocks
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setHasSearched(true);

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const results = await searchStocks(query);
      dispatch(setSearchResults(results));
    } catch (err) {
      dispatch(setError(err.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-emerald-900">
        Stock Market Tracker
      </h1>
      <p className="text-sm text-emerald-700 mb-6">
        Search for stocks and view details before adding them to your portfolio.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for AAPL, TSLA, GOOG..."
          className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-900 border border-emerald-300 placeholder-slate-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-600 dark:placeholder-slate-400"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm transition"
        >
          Search
        </button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="text-emerald-800">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* No results */}
      {!loading && hasSearched && searchResults.length === 0 && (
        <p className="text-slate-600">
          No results found for "{query}". Try searching by symbol (AAPL, TSLA,
          MSFT).
        </p>
      )}

      {/* Results */}
      <div className="mt-4 space-y-3">
        {searchResults.map((stock) => (
          <div
            key={stock.symbol}
            className="p-4 bg-white/90 border border-emerald-200 rounded-lg flex items-center justify-between shadow-sm hover:border-emerald-500 transition dark:bg-slate-900/80 dark:border-slate-700 dark:hover:border-emerald-400"
          >
            <div>
              <p className="font-semibold text-emerald-900">
                {stock.symbol} — {stock.name}
              </p>
              <p className="text-sm text-emerald-700/80">
                {stock.region} • {stock.currency}
              </p>
            </div>

            <Link
              to={`/stock/${stock.symbol}`}
              className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium shadow-sm transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockSearch;
