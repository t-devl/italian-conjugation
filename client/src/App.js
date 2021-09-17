import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";

function App() {
  const [isOptionsModalActive, setIsOptionsModalActive] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const openOptionsModal = () => {
    setIsOptionsModalActive(true);
    setIsGameRunning(false);
  };

  return (
    <div className="App">
      <Header openOptionsModal={openOptionsModal}></Header>
    </div>
  );
}

export default App;
