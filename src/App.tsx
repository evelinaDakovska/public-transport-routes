import React from "react";
import styles from "./App.module.scss";
import HeaderComponent from "./components/headerComponent/headerComponent";
import LinesMenuComponent from "./components/linesMenuComponent/linesMenuComponent";
import MapComponent from "./components/mapComponent/mapComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <div className={styles.main}>
        <LinesMenuComponent />
        <MapComponent />
      </div>
    </>
  );
}

export default App;
