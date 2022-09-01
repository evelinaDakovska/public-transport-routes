import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  getMultipleStopsData,
  getPolylineData,
  getStopPosition,
} from "../../slices/dataSlice";
import { LocationInterface, stopDataInterface } from "../../slices/dataTypes";
import { LocationMarker } from "./locationMarker";
import styles from "./mapComponent.module.scss";
import { PolylineMarker } from "./polylineMarker";

const MapComponent = () => {
  const position: stopDataInterface = useSelector(getStopPosition);
  const polylineData = useSelector(getPolylineData);
  const multipleStopsData = useSelector(getMultipleStopsData);
  const [polyline, setPolyline] = useState<LocationInterface[][]>();
  const [multipleStops, setMultipleStops] = useState<stopDataInterface>();

  useEffect(() => {
    setPolyline(polylineData);
    setMultipleStops(multipleStopsData);
  }, [polylineData, multipleStopsData]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={{ lat: 42.6971, lng: 23.3226 }}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <LocationMarker />}
        {polyline && (
          <>
            <PolylineMarker polyline={polyline} />
            {multipleStops &&
              Object.keys(multipleStops).map((currentStop) => (
                <Marker position={multipleStops[currentStop]} key={uuidv4()}>
                  <Popup>{currentStop}</Popup>
                </Marker>
              ))}
          </>
        )}
      </MapContainer>
    </div>
  );
};
export default MapComponent;
