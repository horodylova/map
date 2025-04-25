export function getUniqueLanguages(countryNames, getCountryLanguages) {
    const languageSet = new Set();
    countryNames.forEach(name => {
      const langs = getCountryLanguages(name);
      langs.forEach(lang => languageSet.add(lang));
    });
    return Array.from(languageSet);
  }