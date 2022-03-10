import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";
import styled from "styled-components";

const MapContainer = styled.div`
  height: 500px;
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);

  .leaflet-container {
    height: 100%;
    border-radius: 12px;
  }

  .info-flag img {
    width: 100px;
    border-radius: 5px;
  }

  .info-name {
    font-size: 20px;
    font-weight: bold;
    color: #42b883;
  }

  .info-container {
    width: 150px;
  }

  .info-flag {
    height: 80px;
    width: 100%;
    background-size: cover;
    border-radius: 8px;
  }

  .info-confirmed,
  .info-recovered,
  .info-deaths {
    font-size: 16px;
    margin-top: 5px;
  }
`;

function Map({ countries, casesType, center, zoom }) {
  return (
    <MapContainer>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </MapContainer>
  );
}

export default Map;
