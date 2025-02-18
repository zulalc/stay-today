"use client";

import Title from "./Title";
import CountryDetails from "../card/CountryDetails";
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { findCountryByCode } from "@/utils/countries";
import { useEffect, useRef } from "react";
import MapWrapper from "./MapWrapper";

function Map({ countryCode }: { countryCode: string }) {
  const defaultLocation = [51.505, -0.09] as [number, number];
  const location = findCountryByCode(countryCode)?.location as [number, number];

  return (
    <div className="mt-4">
      <div className="mb-4 ">
        <Title text="Where You'll Stay" />
        <CountryDetails countryCode={countryCode} />
      </div>
      <MapWrapper countryCode={countryCode} location={location} />
    </div>
  );
}

export default Map;
