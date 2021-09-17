import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import OptionsModal from "./components/OptionsModal";

function App() {
  const [isOptionsModalActive, setIsOptionsModalActive] = useState(true);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedTense, setSelectedTense] = useState("");
  const [selectedVerbEnding, setSelectedVerbEnding] = useState("");

  const openOptionsModal = () => {
    setIsOptionsModalActive(true);
    setIsGameRunning(false);
  };

  const changeOptions = (mood, tense, verbEnding) => {
    setSelectedMood(mood);
    setSelectedTense(tense);
    setSelectedVerbEnding(verbEnding);
  };

  return (
    <div className="App">
      <Header openOptionsModal={openOptionsModal}></Header>
      <OptionsModal
        isActive={isOptionsModalActive}
        setIsActive={setIsOptionsModalActive}
        applySelections={changeOptions}
      ></OptionsModal>
    </div>
  );
}

export default App;
