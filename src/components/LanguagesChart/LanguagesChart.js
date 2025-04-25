import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import styles from "./LanguagesChart.module.css";

const COLORS = [
  "#0077ff", "#5d43ff", "#00c2ff", "#ff3a5e", "#2dd36f", "#f7b32b", "#6b7280"
];

export default function LanguagesChart({ languages }) {
  if (!languages || languages.length === 0) {
    return <div className={styles.noData}>No language data available</div>;
  }

  const data = [...languages].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className={styles.languagesChartContainer}>
      <h3 className={styles.languagesChartTitle}>Languages</h3>
      <ResponsiveContainer width="100%" height={50 + 38 * data.length}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 70, left: 10, bottom: 10 }} 
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            style={{ fontSize: 13 }}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110} 
            style={{ fontSize: 15 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => `${value}%`}
            labelFormatter={(label) => `Language: ${label}`}
          />
          <Bar dataKey="percentage" radius={[6, 6, 6, 6]}>
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
            <LabelList dataKey="percentage" position="right" formatter={(v) => `${v}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}