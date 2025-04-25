
/**
 * Aggregates foreign population data for multiple countries.
 * Returns array of { name, percentage }.
 * @param {string[]} countryNames
 * @param {function} getCountryForeignPopulation
 * @returns {Array<{ name: string, percentage: number }>}
 */
export function getAggregatedForeignPopulation(countryNames, getCountryForeignPopulation) {
  const nationalityTotals = {};
  const nationalityCounts = {};

  countryNames.forEach(countryName => {
    const foreignPop = getCountryForeignPopulation(countryName);
    if (foreignPop) {
      Object.entries(foreignPop).forEach(([nationality, percent]) => {
        if (!nationalityTotals[nationality]) {
          nationalityTotals[nationality] = 0;
          nationalityCounts[nationality] = 0;
        }
        nationalityTotals[nationality] += Number(percent);
        nationalityCounts[nationality] += 1;
      });
    }
  });

  // Average percentage for each nationality (by number of countries where it appears)
  return Object.keys(nationalityTotals).map(nationality => ({
    name: nationality,
    percentage: nationalityCounts[nationality]
      ? +(nationalityTotals[nationality] / nationalityCounts[nationality]).toFixed(2)
      : 0
  })).sort((a, b) => b.percentage - a.percentage);
}