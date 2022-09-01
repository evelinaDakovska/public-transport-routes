import styles from "./App.module.scss";
import LinesMenuComponent from "./components/linesMenuComponent/linesMenuComponent";
import MapComponent from "./components/mapComponent/mapComponent";

function App() {
  return (
    <div className={styles.main}>
      <LinesMenuComponent />
      <MapComponent />
    </div>
  );
}

export default App;
