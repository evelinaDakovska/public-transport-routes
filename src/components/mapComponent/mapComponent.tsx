import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { getPolylineData, getStopPosition } from "../../slices/dataSlice";
import { LocationMarker } from "./currentLocationMarker";
import styles from "./mapComponent.module.scss";

const MapComponent = () => {
  const position = useSelector(getStopPosition);
  const polylineData = useSelector(getPolylineData);
  console.log(polylineData);

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
        {polylineData.length > 0 && (
          <Polyline
            pathOptions={{ color: "lime" }}
            positions={polylineData[0]}
          />
        )}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};
export default MapComponent;
