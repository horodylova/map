"use client"

import React, { useState } from "react";
import euData from "../../../data/euData.json";
import styles from "./CategoryRadioGroup.module.css";

const categories = euData.metadata.categories;

export default function CategoryRadioGroup({ onChange }) {
  const [selected, setSelected] = useState(categories[0]);

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className={styles.radioGroup}>
      {categories.map((cat) => (
        <label key={cat} className={styles.radioLabel}>
          <input
            type="radio"
            name="category"
            value={cat}
            checked={selected === cat}
            onChange={handleChange}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>{cat}</span>
        </label>
      ))}
    </div>
  );
}