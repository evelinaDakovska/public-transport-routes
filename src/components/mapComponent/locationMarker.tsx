import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { getStopPosition } from "../../slices/dataSlice";
import { LocationInterface } from "../../slices/dataTypes";

export const LocationMarker = () => {
  const statePosition = useSelector(getStopPosition);
  const map = useMap();
  const [popupText, setPopupText] = useState<string>("Sofia");
  const [position, setPosition] = useState<LocationInterface>();

  useEffect(() => {
    setPopupText(Object.keys(statePosition)[0]);
    setPosition(statePosition[popupText]);
  }, [map, popupText, statePosition]);

  useEffect(() => {
    if (popupText === "Sofia" && statePosition[popupText]) {
      map.flyTo(statePosition[popupText], map.getZoom());
    } else if (statePosition[popupText]) {
      map.flyTo(statePosition[popupText], map.getMaxZoom());
    }
  }, [map, popupText, statePosition]);

  return position ? (
    <Marker position={position}>
      <Popup>{popupText}</Popup>
    </Marker>
  ) : null;
};
