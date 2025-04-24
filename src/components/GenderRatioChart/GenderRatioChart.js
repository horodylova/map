import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./GenderRatioChart.module.css";

const COLORS = ["#0077ff", "#ff3a5e"];

export default function GenderRatioChart({ genderRatio }) {
  const data = [
    { name: "Women", value: genderRatio.women },
    { name: "Men", value: genderRatio.men }
  ];

  return (
    <div className={styles.genderChartContainer}>
      <h3 className={styles.genderChartTitle}>Gender Ratio</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            innerRadius={40}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.genderNumbers}>
        <span className={styles.women}>
          Women: <b>{genderRatio.women}%</b>
        </span>
        <span className={styles.men}>
          Men: <b>{genderRatio.men}%</b>
        </span>
      </div>
    </div>
  );
}