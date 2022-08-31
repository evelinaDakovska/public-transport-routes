import { useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { LocationMarker } from "./currentLocationMarker";
import styles from "./mapComponent.module.scss";

const MapComponent = () => {
  const [isLocationClicked, setIsLocationClicked] = useState<boolean>(false);

  const position = [
    { lat: 42.6971, lng: 23.3226 },
    { lat: 42.72839501698812, lng: 23.249529997507732 },
    { lat: 42.726473363240565, lng: 23.253188339869183 },
  ];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position[0]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "90%", width: "90%", display: "flex" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position.map((current) => {
          return (
            <Marker position={current} key={current.lat}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
        <Polyline pathOptions={{ color: "lime" }} positions={position} />
        <LocationMarker
          isLocationClicked={isLocationClicked}
          setIsLocationClicked={setIsLocationClicked}
        />
      </MapContainer>
      <button
        style={{ backgroundColor: "red" }}
        onClick={() => setIsLocationClicked(true)}
      >
        Locate me
      </button>
    </div>
  );
};
export default MapComponent;
