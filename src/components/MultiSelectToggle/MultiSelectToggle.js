"use client";

import React from "react";

import styles from "./MultiSelectToggle.module.css";

export default function MultiSelectToggle({ isMulti, onToggle, onReset, label }) {
  return (
    <div className={styles.toggleContainer}>
      <button
        className={`${styles.toggleButton} ${isMulti ? styles.active : ""}`}
        onClick={onToggle}
        type="button"
      >
        {label}
      </button>
      <button
        className={styles.resetButton}
        onClick={onReset}
        type="button"
      >
        Reset
      </button>
    </div>
  );
}