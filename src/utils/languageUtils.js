export function getUniqueLanguages(countryNames, getCountryLanguages) {
    const languageSet = new Set();
    countryNames.forEach(name => {
      const langs = getCountryLanguages(name);
      langs.forEach(lang => languageSet.add(lang));
    });
    return Array.from(languageSet);
  }

export function getAggregatedLanguages(countryNames, getCountryLanguages) {
  const languageTotals = {};
  const languageCounts = {};

  countryNames.forEach(countryName => {
    const langs = getCountryLanguages(countryName);
    if (langs && Array.isArray(langs)) {
      langs.forEach(({ name, percentage }) => {
        if (!languageTotals[name]) {
          languageTotals[name] = 0;
          languageCounts[name] = 0;
        }
        languageTotals[name] += Number(percentage);
        languageCounts[name] += 1;
      });
    }
  });

  return Object.keys(languageTotals)
    .map(name => ({
      name,
      percentage: +(languageTotals[name] / languageCounts[name]).toFixed(2)
    }))
    .sort((a, b) => b.percentage - a.percentage);
}