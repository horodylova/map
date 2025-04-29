"use client"

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geoData from "../../../data/world-110m.json";
import euData from "../../../data/euData.json";
import styles from "./Map.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const euCountryNames = euData.countries.map((country) => country.name);

export default function EuInteractiveMap({
  isMulti,
  selectedCountry,
  selectedCountries,
  onCountryClick,
  zoom = 1,
  center = [0, 0],
  onMoveEnd,
}) {
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const initialPosition = {
    coordinates: [0, 0],
    zoom: 1
  };
  
  const position = hasInteracted 
    ? { coordinates: center, zoom: zoom } 
    : initialPosition;

  const handleMoveEnd = (pos) => {
    setHasInteracted(true);
    if (onMoveEnd) {
      onMoveEnd(pos);
    }
  };

  useEffect(() => {
    if ((zoom !== initialPosition.zoom || 
        center[0] !== initialPosition.coordinates[0] || 
        center[1] !== initialPosition.coordinates[1]) && 
        !hasInteracted) {
      setHasInteracted(true);
    }
  }, [zoom, center, hasInteracted]);

  return (
    <div className={styles.mapWrapper}>
      <ComposableMap
        width={800}
        style={{ width: "100%", maxWidth: "100%", height: "auto" }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          minZoom={1}
          maxZoom={8}
          onMoveEnd={handleMoveEnd}
          onMoveStart={() => setHasInteracted(true)}
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.NAME || geo.properties.name;
                const isEU = euCountryNames.includes(countryName);
                
                const isSelected = isMulti
                  ? selectedCountries.includes(countryName)
                  : selectedCountry === countryName;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id={isEU ? "eu-tooltip" : undefined}
                    data-tooltip-content={isEU ? countryName : undefined}
                    onClick={
                      isEU
                        ? (event) => {
                            setHasInteracted(true);
                            onCountryClick(countryName, event);
                          }
                        : undefined
                    }
                    style={{
                      default: {
                        fill: isSelected
                          ? "var(--color-secondary)"
                          : isEU
                          ? "var(--color-primary)"
                          : "var(--color-border)",
                        stroke: "var(--color-text)",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isEU ? "pointer" : "default",
                      },
                      hover: {
                        fill: isEU
                          ? "var(--color-secondary)"
                          : "var(--color-text-light)",
                        outline: "none",
                      },
                      pressed: {
                        fill: isEU
                          ? "var(--color-tertiary)"
                          : "var(--color-text-light)",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip
        id="eu-tooltip"
        place="top"
        className={styles.euTooltip}
        style={{
          backgroundColor: "var(--color-primary)",
          color: "var(--color-bg)",
          borderRadius: "6px",
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "0.5em 1em"
        }}
      />
    </div>
  );
}