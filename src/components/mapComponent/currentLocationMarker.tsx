import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { getStopPosition } from "../../slices/dataSlice";

export const LocationMarker = () => {
  const statePosition = useSelector(getStopPosition);
  const map = useMap();

  useEffect(() => {
    map.flyTo(statePosition, map.getZoom());
  }, [map, statePosition]);

  return statePosition ? (
    <Marker position={statePosition}>
      <Popup>Stop</Popup>
    </Marker>
  ) : null;
};
