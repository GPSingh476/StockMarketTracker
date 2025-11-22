import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import StockSearch from "./features/stocks/StockSearch";
import StockDetails from "./features/stocks/StockDetails";
import PortfolioPage from "./features/portfolio/PortfolioPage";
import WatchlistPage from "./features/watchlist/WatchlistPage";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement; 
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-lime-50 text-gray-900 dark:from-slate-950 dark:via-slate-950 dark:to-black dark:text-slate-100">
      {/* Navbar */}
      <header className="border-b border-emerald-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 gap-4">
          <h1 className="text-lg font-semibold tracking-tight text-emerald-900 dark:text-emerald-200">
            Stock Market Tracker
          </h1>

          <div className="flex items-center gap-4">
            <nav className="flex gap-6 text-sm">
              <Link
                to="/"
                className="text-emerald-800 hover:text-emerald-600 dark:text-emerald-200 dark:hover:text-emerald-400 transition"
              >
                Search
              </Link>
              <Link
                to="/portfolio"
                className="text-emerald-800 hover:text-emerald-600 dark:text-emerald-200 dark:hover:text-emerald-400 transition"
              >
                Portfolio
              </Link>
              <Link
                to="/watchlist"
                className="text-emerald-800 hover:text-emerald-600 dark:text-emerald-200 dark:hover:text-emerald-400 transition"
              >
                Watchlist
              </Link>
            </nav>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-xs rounded-full border border-emerald-300 bg-white px-3 py-1 font-medium text-emerald-800 shadow-sm hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 transition"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Routes>
          <Route path="/" element={<StockSearch />} />
          <Route path="/stock/:symbol" element={<StockDetails />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} /> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
