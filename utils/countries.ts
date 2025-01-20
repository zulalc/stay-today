import countries from "world-countries";

export const formatCountries = countries.map((country) => ({
  code: country.cca2,
  name: country.name.common,
  flag: country.flag,
  location: country.latlng,
  region: country.region,
}));

export const findCountryByCode = (code: string) =>
  formatCountries.find((country) => country.code === code);
