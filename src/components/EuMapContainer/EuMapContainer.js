"use client"
"use client"

import euData from "../../../data/euData.json"
import styles from "./EuMapContainer.module.css"

import EuInteractiveMap from '@/components/Map/Map'

export default function EuMapContainer() {
  const meta = euData.metadata;

  return (
    <div className={styles.euMapContainer}>
      <h2 className={styles.euMapTitle}>{meta.description}</h2>
      <div className={styles.euMapUpdated}>
        Last updated: {meta.lastUpdated}
      </div>
      <div>
        <EuInteractiveMap/>
      </div>
    </div>
  );
}