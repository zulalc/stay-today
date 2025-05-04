"use client";

import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import Title from "./Title";
import { findCountryByCode } from "@/utils/countries";
import CountryDetails from "../card/CountryDetails";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function PropertyMap({ countryCode }: { countryCode: string }) {
  const defaultLocation = { latitude: 51.505, longitude: -0.09 };
  const location = findCountryByCode(countryCode)?.location || [
    defaultLocation.latitude,
    defaultLocation.longitude,
  ];

  const latitude = location[0];
  const longitude = location[1];

  const lightMapStyle =
    "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
  const darkMapStyle =
    "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

  const [mapStyle, setMapStyle] = useState("");

  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    setMapStyle(resolvedTheme === "dark" ? darkMapStyle : lightMapStyle);
  }, [theme, systemTheme]);

  return (
    <div className="mt-4">
      <div className="mb-4">
        <Title text="Where you will be staying" />
        <CountryDetails countryCode={countryCode} />
      </div>

      <div className="h-[50vh] w-full rounded-lg overflow-hidden">
        <Map
          initialViewState={{
            latitude,
            longitude,
            zoom: 7,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
        >
          <Marker latitude={latitude} longitude={longitude} color="#7c3aed" />
          <NavigationControl position="bottom-right" />
        </Map>
      </div>
    </div>
  );
}

export default PropertyMap;
