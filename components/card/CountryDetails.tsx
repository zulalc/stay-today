import { findCountryByCode } from "@/utils/countries";

function CountryDetails({ countryCode }: { countryCode: string }) {
  const country = findCountryByCode(countryCode);
  const countryName =
    country!.name.length > 20
      ? country!.name.substring(0, 20) + "..."
      : country!.name;
  return (
    <span className="flex justify-between items-center gap-2 text-sm">
      {countryName}
    </span>
  );
}

export default CountryDetails;
