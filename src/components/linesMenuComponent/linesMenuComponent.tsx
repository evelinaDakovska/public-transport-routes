import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TrainIcon from "@mui/icons-material/Train";
import TramIcon from "@mui/icons-material/Tram";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  getFullData,
  setClearData,
  setPolylineData,
  setStopPosition,
  setStopsData,
} from "../../slices/dataSlice";
import styles from "./linesMenuComponent.module.scss";

const LinesMenuComponent = () => {
  const dispatch = useDispatch();
  const [transportTypes, setTransportTypes] = useState<
    Record<string, string[]>
  >({});
  const [checkedId, setCheckedId] = useState<string>();
  const [currentTransportType, setCurrentTransportType] = useState<string>();
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
    dispatch(
      setStopPosition({
        stopName: currentRoute.name,
        stopLocation: currentRoute.location,
      })
    );
  };

  const onCheckBoxChanged = (
    routeId: number,
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    dispatch(setClearData());
    if (e.currentTarget?.checked) {
      setCheckedId(name);
      dispatch(setPolylineData(routeId));
      dispatch(setStopsData(routeId));
    } else {
      setCheckedId("");
    }
  };
  const handleClick = (typeTr: string) => {
    if (typeTr === "A") {
      setCurrentTransportType("A");
    } else if (typeTr === "TM") {
      setCurrentTransportType("TM");
    } else if (typeTr === "TB") {
      setCurrentTransportType("TB");
    }
  };

  return (
    <div className={styles.linesMenu}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "5%",
        }}
      >
        <Tooltip title="Виж всички автобуси" arrow followCursor>
          <Button key="bus" onClick={() => handleClick("A")} variant="outlined">
            <DirectionsBusIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Виж всички трамваи" arrow followCursor>
          <Button
            key="tram"
            onClick={() => handleClick("TM")}
            variant="outlined"
          >
            <TrainIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Виж всички тролеи" arrow followCursor>
          <Button
            key="trol"
            onClick={() => handleClick("TB")}
            variant="outlined"
          >
            <TramIcon />
          </Button>
        </Tooltip>
      </Box>
      {currentTransportType ? (
        transportTypes[currentTransportType].map((lineData) => (
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
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
                              checked={checkedId === routes.name}
                              onChange={(e) =>
                                onCheckBoxChanged(routes.id, e, routes.name)
                              }
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
          </TreeView>
        ))
      ) : (
        <div>
          <h5>
            Карта на София с възможност за показване на мершрут на градския
            транспорт
          </h5>
          <p>Моля изберете вид транпорт</p>
          <p>Моля изберете линия и посока</p>
          <p>
            Можете да изберете да се покаже целия маршрут или всяка спирка по
            отделно
          </p>
          <p>Кликнете на маркера за да видите името на спирката</p>
        </div>
      )}
    </div>
  );
};
export default LinesMenuComponent;
