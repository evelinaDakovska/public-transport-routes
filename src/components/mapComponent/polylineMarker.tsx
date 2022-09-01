import { FC, useEffect } from "react";
import { Polyline, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { getStopPosition } from "../../slices/dataSlice";
import { LocationInterface } from "../../slices/dataTypes";

export const PolylineMarker: FC<{ polyline: LocationInterface[][] }> = ({
  polyline,
}) => {
  const map = useMap();
  const statePosition = useSelector(getStopPosition);

  useEffect(() => {
    if (polyline.length > 0) {
      map.flyTo(polyline[0][0]);
      if (Object.keys(statePosition)[0] === "Sofia") {
        map.zoomOut();
      } else {
        map.zoomOut(6);
      }
    }
  }, [map, polyline, statePosition]);

  return (
    <>
      {polyline
        ? polyline.map((currentPolyline) => (
            <Polyline
              pathOptions={{ color: "#FF0000" }}
              positions={currentPolyline}
            />
          ))
        : null}
    </>
  );
};
