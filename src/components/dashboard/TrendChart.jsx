import React, { useMemo } from "react";

import { usePiggy } from "../../context/PiggyContext";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrendChart = ({ data }) => {
  // Format the date for the X-Axis (e.g., "2026-03-21" -> "Mar 21")
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  console.log("Chart Data Received:", data);
  if (!data || data.length === 0) return null;

  return (
    <div
      className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 w-full h-80"
      id="trend"
      style={{ height: "350px" }}
    >
      <h3 className="text-white text-lg font-semibold mb-4" id="trendHead">
        7-Day Spending Trend
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1289A7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1289A7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `৳${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            itemStyle={{ color: "#1289A7" }}
            formatter={(value) => [`৳${value}`, "Spent"]}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#1289A7"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
