import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function PriceChart({ data }) {
  if (!data || data.length === 0) return null;

  const sliced = [...data].slice(0, 30).reverse();

  return (
    <div className="rounded-xl border border-emerald-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <h2 className="text-lg font-semibold mb-3 text-emerald-900 dark:text-emerald-200">
        Closing Price (Last {sliced.length} Days)
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sliced}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="close" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PriceChart;
