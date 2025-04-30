"use client"

import React, { useState } from "react";
import AsylumSeekersChart from "@/components/AsylumSeekersChart/AsylumSeekersChart";
import LanguagesChart from "@/components/LanguagesChart/LanguagesChart";
import euData from "../../../data/euData.json";
import styles from "./EuMapContainer.module.css";

import CategoryRadioGroup from "@/components/CategoryRadioGroup/CategoryRadioGroup";
import MultiSelectToggle from "@/components/MultiSelectToggle/MultiSelectToggle";
import EuInteractiveMap from '@/components/Map/Map';
import Modal from "../Modal/Modal";
import { getSummedAsylumSeekers } from "@/utils/asylumUtils";
import { getAggregatedLanguages } from "@/utils/languageUtils";
import { getAggregatedForeignPopulation } from "@/utils/foreignPopulationUtils"; 
import ForeignPopulationChart from "@/components/ForeignPopulationChart/ForeignPopulationChart"; 

const categories = euData.metadata.categories;

export default function EuMapContainer() {
  const countriesData = euData.countries;

  const [isMulti, setIsMulti] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [mapPosition, setMapPosition] = useState({
    coordinates: [0, 0], 
    zoom: 1
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedCountry(null);
    setSelectedCountries([]);
    setIsModalOpen(false);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsMulti(prev => !prev);
    setSelectedCountry(null);
    setSelectedCountries([]);
    setIsModalOpen(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setIsMulti(false);
    setSelectedCountry(null);
    setSelectedCountries([]);
    setIsModalOpen(false);
  };

  const handleCountryClick = (countryName, event) => {
    if (event) {
      event.stopPropagation();
    }
    if (isMulti) {
      setSelectedCountries(prev => {
        const newList = prev.includes(countryName)
          ? prev.filter(c => c !== countryName)
          : [...prev, countryName];
        return newList;
      });
      setIsModalOpen(false);
      setSelectedCountry(null);
    } else {
      setSelectedCountry(countryName);
      setSelectedCountries([]);
      setIsModalOpen(true);
    }
  };

  const handleShowData = (e) => {
    e.stopPropagation();
    if (isMulti && selectedCountries.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountries([]);
    setSelectedCountry(null);
    setIsMulti(false); 
  };

  const getCountryAsylumSeekers = (countryName) => {
    const country = countriesData.find(c => c.name === countryName);
    return country && country.asylumSeekers ? country.asylumSeekers : {};
  };

  const getCountryLanguages = (countryName) => {
    const country = countriesData.find(c => c.name === countryName);
    return country ? country.languages : [];
  };

  const getCountryForeignPopulation = (countryName) => {
    const country = countriesData.find(c => c.name === countryName);
    return country ? country.foreignPopulation : {};
  };

  const handleZoomIn = () => {
    setMapPosition(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom + 0.5, 8) 
    }));
  };
  
  const handleZoomOut = () => {
    setMapPosition(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom - 0.5, 1) 
    }));
  };
  
  const handleMoveEnd = (position) => {
    setMapPosition(position);
  };

  return (
    <div className="container">
      <div className={styles.euMapContainer}>
        <h2 className={styles.euMapTitle}>
          Example Map 1 – EU population diversity by citizenship and language
        </h2>
        <div className={styles.mapLayoutRow}>
          <div className={styles.mapOptionsSidebar}>
            <CategoryRadioGroup onChange={handleCategoryChange} />
          </div>
          <div className={styles.mapMainBlock}>
            <div className={styles.zoomControls}>
              <button className={styles.zoomButton} onClick={handleZoomIn} aria-label="Zoom in">+</button>
              <button className={styles.zoomButton} onClick={handleZoomOut} aria-label="Zoom out">–</button>
            </div>
            <EuInteractiveMap
              isMulti={isMulti}
              selectedCountry={selectedCountry}
              selectedCountries={selectedCountries}
              onCountryClick={handleCountryClick}
              zoom={mapPosition.zoom}
              center={mapPosition.coordinates}
              onMoveEnd={handleMoveEnd}
            />
          </div>
          <div className={styles.mapControlsSidebar}>
            <div className={styles.multiSelectRow}>
              <div className={styles.multiSelectToggleWrap}>
                <MultiSelectToggle
                  isMulti={isMulti}
                  onToggle={handleToggle}
                  onReset={handleReset}
                  label="Select multiple countries"
                />
              </div>
              <div className={styles.multiSelectInfo}>
                {isMulti ? (
                  selectedCountries.length > 0 ? (
                    <span className={styles.selectedCountriesInfo}>
                      You have selected: {selectedCountries.join(", ")}
                    </span>
                  ) : (
                    <span className={styles.noCountriesInfo} style={{visibility: "visible"}}>
                      No countries selected
                    </span>
                  )
                ) : (
                  <span className={styles.noCountriesInfo} style={{visibility: "hidden"}}>
                    No countries selected
                  </span>
                )}
              </div>
              <div className={styles.multiSelectButtonWrap}>
                <button
                  className={styles.showDataButton}
                  onClick={handleShowData}
                  disabled={!isMulti || selectedCountries.length === 0}
                  style={!isMulti ? {visibility: "hidden"} : {}}
                >
                  Show Data
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          {isMulti && selectedCountries.length > 0 ? (
            <div className={styles.modalSummaryBlock}>
              <h2 className={styles.selectedCountryTitle}>
                Selected countries: {selectedCountries.length}
              </h2>
              <ul className={styles.selectedCountriesList}>
                {selectedCountries.map((country) => (
                  <li className={styles.selectedCountryItem} key={country}>{country}</li>
                ))}
              </ul>
              {selectedCategory === "Asylum Seekers" ? (
                <AsylumSeekersChart
                  dataByYear={getSummedAsylumSeekers(selectedCountries, getCountryAsylumSeekers)}
                />
              ) : selectedCategory === "Languages" ? (
                <LanguagesChart
                  languages={getAggregatedLanguages(selectedCountries, getCountryLanguages)}
                />
              ) : selectedCategory === "Foreign Population" ? (
                <ForeignPopulationChart
                  foreignPopulation={getAggregatedForeignPopulation(selectedCountries, getCountryForeignPopulation)}
                />
              ) : null}
            </div>
          ) : (!isMulti && selectedCountry) ? (
            <div className={styles.modalSummaryBlock}>
              <h2 className={styles.selectedCountryTitle}>{selectedCountry}</h2>
              {
                countriesData.find(c => c.name === selectedCountry)?.note && (
                  <div style={{fontSize: "0.95rem", color: "var(--color-text-light)", marginBottom: "0.7em"}}>
                    {countriesData.find(c => c.name === selectedCountry).note}
                  </div>
                )
              }
              {selectedCategory === "Asylum Seekers" ? (
                <AsylumSeekersChart
                  dataByYear={getCountryAsylumSeekers(selectedCountry)}
                />
              ) : selectedCategory === "Languages" ? (
                <LanguagesChart languages={getCountryLanguages(selectedCountry)} />
              ) : selectedCategory === "Foreign Population" ? (
                <ForeignPopulationChart
                  foreignPopulation={
                    Object.entries(getCountryForeignPopulation(selectedCountry)).map(([name, percentage]) => ({
                      name,
                      percentage
                    }))
                  }
                />
              ) : null}
            </div>
          ) : null}
        </Modal>
      </div>
    </div>
  );
}