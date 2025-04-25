"use client"

import React, { useState } from "react";
import GenderRatioChart from "@/components/GenderRatioChart/GenderRatioChart";
import LanguagesChart from "@/components/LanguagesChart/LanguagesChart";
import euData from "../../../data/euData.json";
import styles from "./EuMapContainer.module.css";

import CategoryRadioGroup from "@/components/CategoryRadioGroup/CategoryRadioGroup";
import MultiSelectToggle from "@/components/MultiSelectToggle/MultiSelectToggle";
import EuInteractiveMap from '@/components/Map/Map';
import Modal from "../Modal/Modal";
import { getSummedGenderRatio } from "@/utils/genderUtils";
import { getAggregatedLanguages } from "@/utils/languageUtils";
import { getAggregatedForeignPopulation } from "@/utils/foreignPopulationUtils"; 
import ForeignPopulationChart from "@/components/ForeignPopulationChart/ForeignPopulationChart"; 

export default function EuMapContainer() {
  const meta = euData.metadata;
  const countriesData = euData.countries;

  const [isMulti, setIsMulti] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(meta.categories[0]);

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

  const getCountryGenderRatio = (countryName) => {
    const country = countriesData.find(c => c.name === countryName);
    return country ? country.genderRatio : null;
  };

  const getCountryLanguages = (countryName) => {
    const country = countriesData.find(c => c.name === countryName);
    return country ? country.languages : [];
  };

  const getCountryForeignPopulation = (countryName) => {
    const country = countriesData.find(c => c.name === countryName);
    return country ? country.foreignPopulation : {};
  };

  return (
    <div className={styles.euMapContainer}>
      <div className={styles.headerRow}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <h2 className={styles.euMapTitle}>{meta.description}</h2>
      </div>
      <div className={styles.euMapUpdated}>
        Last updated: {meta.lastUpdated}
      </div>
      <CategoryRadioGroup onChange={setSelectedCategory} />
      <div className={styles.multiSelectRow}>
        <div className={styles.multiSelectToggleWrap}>
          <MultiSelectToggle
            isMulti={isMulti}
            onToggle={handleToggle}
            onReset={handleReset}
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
      <div onClick={(e) => e.stopPropagation()}>
        <EuInteractiveMap
          isMulti={isMulti}
          selectedCountry={selectedCountry}
          selectedCountries={selectedCountries}
          onCountryClick={handleCountryClick}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        {isMulti && selectedCountries.length > 0 ? (
          <div className={styles.modalSummaryBlock}>
            <h2 className={styles.selectedCountriesTitle}>
              Selected countries: {selectedCountries.length}
            </h2>
            <ul className={styles.selectedCountriesList}>
              {selectedCountries.map((country) => (
                <li className={styles.selectedCountryItem} key={country}>{country}</li>
              ))}
            </ul>
            {selectedCategory === "Gender Ratio" ? (
              <GenderRatioChart genderRatio={getSummedGenderRatio(selectedCountries, getCountryGenderRatio)} />
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
          <div>
            <h2 className={styles.selectedCountryTitle}>{selectedCountry}</h2>
            {selectedCategory === "Gender Ratio" ? (
              <GenderRatioChart genderRatio={getCountryGenderRatio(selectedCountry)} />
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
  );
}