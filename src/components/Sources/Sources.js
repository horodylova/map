"use client"

import sourcesData from "../../../data/euSources.json";
import styles from "./Sources.module.css";

export default function Sources() {
  return (
    <div className={`${styles.sourcesContainer} footerContent`}>
      <h2 className={styles.sourcesTitle}>Sources</h2>
      <ul className={styles.sourceList}>
        {sourcesData.sources.map((src, idx) => (
          <li key={idx}>
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
            >
              {src.title}
            </a>
            <div className={styles.sourceDesc}>{src.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}