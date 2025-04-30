
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

  return Object.keys(nationalityTotals).map(nationality => ({
    name: nationality,
    percentage: nationalityCounts[nationality]
      ? +(nationalityTotals[nationality] / nationalityCounts[nationality]).toFixed(2)
      : 0
  })).sort((a, b) => b.percentage - a.percentage);
}