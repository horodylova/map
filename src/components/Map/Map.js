"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import geoData from "../../../data/world-110m.json";
import euData from "../../../data/euData.json";

const euCountryNames = euData.countries.map((country) => country.name);

export default function EuInteractiveMap() {
  return (
    <ComposableMap>
      <Geographies geography={geoData}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryName = geo.properties.NAME || geo.properties.name;
            const isEU = euCountryNames.includes(countryName);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: isEU ? "var(--color-primary)" : "var(--color-border)",
                    stroke: "var(--color-text)",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: isEU ? "var(--color-secondary)" : "var(--color-text-light)",
                    outline: "none",
                  },
                  pressed: {
                    fill: isEU ? "var(--color-tertiary)" : "var(--color-text-light)",
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}