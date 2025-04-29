import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./ForeignPopulationChart.module.css";

const COLORS = [
  "#0077ff", "#5d43ff", "#00c2ff", "#ff3a5e", "#2dd36f", "#f7b32b", "#6b7280"
];

export default function ForeignPopulationChart({ foreignPopulation }) {
  if (!foreignPopulation || !Array.isArray(foreignPopulation) || foreignPopulation.length === 0) {
    return <div className={styles.noData}>No foreign population data available</div>;
  }

  const data = foreignPopulation.map((item, idx) => ({
    nationality: item.name,
    value: Number(item.percentage),
    fill: COLORS[idx % COLORS.length]
  }));

  return (
    <div className={styles.foreignPopulationChartContainer}>
      <h3 className={styles.foreignPopulationChartTitle}>Foreign Population</h3>
      <div style={{fontSize: "0.95rem", color: "var(--color-text-light)", marginBottom: "0.7em"}}>
        ‘Foreign’ is defined differently in each country, generally referring to residents without citizenship or a local passport.
      </div>
      <ResponsiveContainer key={data.map(d => d.nationality).join('-')} width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius={110} data={data}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="nationality"
            tick={{ fontSize: 15, fill: "var(--color-text)", dx: 12 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, Math.max(...data.map(d => d.value)) || 1]} tickFormatter={v => `${v}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Radar
            name="Foreign Population"
            dataKey="value"
            stroke="#0077ff"
            fill="#0077ff"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
      <ul
        className={
          data.length > 5
            ? `${styles.nationalityList} ${styles.twoColumns}`
            : styles.nationalityList
        }
      >
        {data.map((item, idx) => (
          <li key={item.nationality} className={styles.nationalityItem}>
            <span
              className={styles.nationalityColor}
              style={{ backgroundColor: item.fill }}
            />
            {item.nationality}: <b>{item.value}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}