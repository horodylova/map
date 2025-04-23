"use client"
"use client"

import euData from "../../../data/euData.json"
import styles from "./EuMapContainer.module.css"

import CategoryRadioGroup from "@/components/CategoryRadioGroup/CategoryRadioGroup";
import EuInteractiveMap from '@/components/Map/Map'
import Sources from '@/components/Sources/Sources'

export default function EuMapContainer() {
  const meta = euData.metadata;

  return (
    <div className={styles.euMapContainer}>
      <h2 className={styles.euMapTitle}>{meta.description}</h2>
      <div className={styles.euMapUpdated}>
        Last updated: {meta.lastUpdated}
      </div>
      <CategoryRadioGroup onChange={(category) => console.log(category)} />
      <div>
        <EuInteractiveMap/>
      </div>
      <Sources />
    </div>
  );
}