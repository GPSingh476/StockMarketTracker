import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromPortfolio,
  updateQuantity,
  clearPortfolio,
} from "./portfolioSlice";

function PortfolioPage() {
  const items = useSelector((state) => state.portfolio.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (symbol, value) => {
    const num = Number(value);
    if (Number.isNaN(num) || num <= 0) return;
    dispatch(updateQuantity({ symbol, quantity: num }));
  };

  const totalValue = items.reduce(
    (sum, item) => sum + item.latestPrice * item.quantity,
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-900">
            My Portfolio
          </h1>
          <p className="text-sm text-emerald-700">
            Track the total value of the stocks you&apos;ve added.
          </p>
        </div>
        <Link
          to="/"
          className="text-sm text-emerald-700 hover:text-emerald-600 transition"
        >
          ← Back to search
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-600">
          Your portfolio is empty. Go to the search page and add some stocks.
        </p>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => dispatch(clearPortfolio())}
              className="inline-flex items-center rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-400 transition shadow-sm"
            >
              Clear Portfolio
            </button>

            <div className="text-right">
              <p className="text-xs uppercase text-emerald-700">Total value</p>
              <p className="text-xl font-semibold text-emerald-900">
                ${totalValue.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-emerald-900">
                <thead>
                  <tr className="border-b border-emerald-200 text-xs uppercase tracking-wide text-emerald-700">
                    <th className="py-2 pr-3 text-left">Symbol</th>
                    <th className="py-2 pr-3 text-left">Name</th>
                    <th className="py-2 pr-3 text-right">Latest Price</th>
                    <th className="py-2 pr-3 text-right">Quantity</th>
                    <th className="py-2 pr-3 text-right">Value</th>
                    <th className="py-2 pl-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {items.map((item) => (
                    <tr key={item.symbol}>
                      <td className="py-2 pr-3 font-medium">
                        {item.symbol}
                      </td>
                      <td className="py-2 pr-3">{item.name}</td>
                      <td className="py-2 pr-3 text-right">
                        {item.latestPrice.toFixed(2)}
                      </td>
                      <td className="py-2 pr-3 text-right">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.symbol, e.target.value)
                          }
                          className="w-20 rounded bg-white border border-emerald-300 px-2 py-1 text-right text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
                        />
                      </td>
                      <td className="py-2 pr-3 text-right">
                        {(item.latestPrice * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-2 pl-3 text-center">
                        <button
                          onClick={() =>
                            dispatch(removeFromPortfolio(item.symbol))
                          }
                          className="inline-flex items-center rounded-md bg-red-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-400 transition shadow-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PortfolioPage;
