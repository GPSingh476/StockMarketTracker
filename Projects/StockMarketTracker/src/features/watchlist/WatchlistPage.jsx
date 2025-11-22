// src/features/watchlist/WatchlistPage.jsx
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromWatchlist,
  clearWatchlist,
} from "./watchlistSlice";

function WatchlistPage() {
  const items = useSelector((state) => state.watchlist.items);
  const dispatch = useDispatch();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-200">
            Watchlist
          </h1>
          <p className="text-sm text-emerald-700 dark:text-emerald-300/80">
            Stocks you&apos;re tracking. Click a symbol to view full details.
          </p>
        </div>
        <Link
          to="/"
          className="text-sm text-emerald-700 hover:text-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200 transition"
        >
          ← Back to search
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">
          Your watchlist is empty. Open a stock and click &quot;Add to
          Watchlist&quot;.
        </p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => dispatch(clearWatchlist())}
              className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 transition shadow-sm"
            >
              Clear Watchlist
            </button>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.symbol}
                  className="flex items-center justify-between gap-3 border-b last:border-b-0 border-emerald-100 dark:border-slate-800 py-2"
                >
                  <div>
                    <Link
                      to={`/stock/${item.symbol}`}
                      className="font-semibold text-emerald-900 hover:text-emerald-600 dark:text-emerald-200 dark:hover:text-emerald-400 transition"
                    >
                      {item.symbol}
                    </Link>
                    <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
                      {item.name}
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromWatchlist(item.symbol))}
                    className="inline-flex items-center rounded-md bg-red-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-400 transition shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WatchlistPage;
