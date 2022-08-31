import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export const LocationMarker = ({
  isLocationClicked,
  setIsLocationClicked,
}: {
  isLocationClicked: boolean;
  setIsLocationClicked: any;
}) => {
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  }>();

  const map = useMap();

  useEffect(() => {
    if (isLocationClicked) {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
      setIsLocationClicked(false);
    }
  }, [map, isLocationClicked, setIsLocationClicked]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here.</Popup>
    </Marker>
  ) : null;
};
