import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { getStopPosition } from "../../slices/dataSlice";
import { LocationMarker } from "./currentLocationMarker";
import styles from "./mapComponent.module.scss";

const MapComponent = () => {
  const position = useSelector(getStopPosition);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        style={{ height: "90%", width: "90%", display: "flex" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={position} key={position.lat}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
        {/*         <Polyline pathOptions={{ color: "lime" }} positions={position} />
         */}{" "}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};
export default MapComponent;
