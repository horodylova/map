import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styles from "./AsylumSeekersChart.module.css";

export default function AsylumSeekersChart({ dataByYear }) {
 
  const data = Object.entries(dataByYear)
    .map(([yearKey, value]) => {
     
      const year = yearKey.includes("year_") ? yearKey.split("_")[1] : yearKey;
      return { year, value };
    })
    .filter(item => Number(item.year) >= 2020 && Number(item.year) <= 2024)
    .sort((a, b) => Number(a.year) - Number(b.year)); 
  return (
    <div className={styles.chartBlock}>
      <div className={styles.chartTitle}>Number of asylum seekers by year</div>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={260} className={styles.chartContainer}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 14, fill: "#444" }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              allowDecimals={false} 
              tick={{ fontSize: 14, fill: "#444" }}
              width={40}
            />
            <Tooltip
              contentStyle={{ 
                background: "#fff", 
                borderRadius: 8, 
                border: "1px solid #e0e0e0", 
                fontSize: 14 
              }}
              labelStyle={{ fontWeight: 600, color: "#0077ff" }}
              formatter={(value) => [Number(value).toLocaleString(), "Applications"]}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="value"
              name="Applications"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ r: 6, fill: "#fff", stroke: "#0077ff", strokeWidth: 2 }}
              activeDot={{ r: 8, fill: "#0077ff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className={styles.noDataMessage}>No data available for this period</div>
      )}
    </div>
  );
}