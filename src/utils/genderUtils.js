export function getSummedGenderRatio(countryNames, getCountryGenderRatio) {
    let women = 0, men = 0;
    countryNames.forEach(name => {
      const ratio = getCountryGenderRatio(name);
      if (ratio) {
        women += ratio.women;
        men += ratio.men;
      }
    });
    const total = women + men;
    if (total > 0) {
      return {
        women: +(women / total * 100).toFixed(1),
        men: +(men / total * 100).toFixed(1)
      };
    }
    return { women: 0, men: 0 };
  }