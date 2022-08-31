import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFullData,
  setPolylineData,
  setStopPosition,
} from "../../slices/dataSlice";
import styles from "./linesMenuComponent.module.scss";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "@mui/material/Checkbox";

const LinesMenuComponent = () => {
  const dispatch = useDispatch();
  const [transportTypes, setTransportTypes] = useState<
    Record<string, string[]>
  >({});
  const dataObj = useSelector(getFullData);
  const data = Object.values(dataObj);

  useEffect(() => {
    const linesWithType: Record<string, string[]> = {};
    for (const current of data) {
      const currentType = current.routes[0].transportType;
      const currentLine = current.line;
      if (linesWithType[currentType]) {
        linesWithType[currentType].push(currentLine);
      } else {
        linesWithType[currentType] = [currentLine];
      }
    }
    setTransportTypes(linesWithType);
  }, []);

  const onStopClick = (currentRoute: any) => {
    console.log(currentRoute.location);
    dispatch(setStopPosition(currentRoute.location));
  };
  const onCheckBoxChanged = (routeId: number) => {
    dispatch(setPolylineData(routeId));
  };

  return (
    <div className={styles.linesMenu}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {Object.keys(transportTypes).map((transportType) => (
          <TreeItem key={uuidv4()} nodeId={transportType} label={transportType}>
            {transportTypes[transportType].map((lineData) => (
              <TreeItem key={uuidv4()} nodeId={lineData} label={lineData}>
                {data
                  ?.filter((c) => c.line === lineData)
                  ?.map(() => {
                    const currentData = data.find((c) => c.line === lineData);
                    const c = currentData?.routes;
                    return c?.map((routes) => {
                      return (
                        <TreeItem
                          key={uuidv4()}
                          nodeId={routes.name}
                          label={
                            <div>
                              <Checkbox
                                onChange={() => onCheckBoxChanged(routes.id)}
                              />
                              {routes.name}
                            </div>
                          }
                        >
                          {routes.stops.map((currentRoute, i) => (
                            <TreeItem
                              key={uuidv4()}
                              nodeId={`${i}`}
                              label={currentRoute.name}
                              onClick={() => onStopClick(currentRoute)}
                            />
                          ))}
                        </TreeItem>
                      );
                    });
                  })}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </div>
  );
};
export default LinesMenuComponent;
