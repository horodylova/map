
export function getSummedAsylumSeekers(countryNames, getCountryAsylumSeekers) {
  const yearTotals = {};
  
  countryNames.forEach(name => {
    const asylumData = getCountryAsylumSeekers(name);
    
    if (asylumData) {
      Object.entries(asylumData).forEach(([yearKey, count]) => {
         const normalizedYear = yearKey.includes("year_") ? yearKey.split("_")[1] : yearKey;
        
        if (!yearTotals[normalizedYear]) {
          yearTotals[normalizedYear] = 0;
        }
        
        yearTotals[normalizedYear] += count;
      });
    }
  });
  
  return yearTotals;
}