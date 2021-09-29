import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Game from "./components/Game";
import Header from "./components/Header";
import OptionsModal from "./components/OptionsModal";

function App() {
  const [isOptionsModalActive, setIsOptionsModalActive] = useState(true);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedTense, setSelectedTense] = useState("");
  const [selectedVerbEnding, setSelectedVerbEnding] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");
  const [verbsData, setVerbsData] = useState([]);

  const isInitialMount = useRef(true);

  const openOptionsModal = () => {
    setIsOptionsModalActive(true);
    setIsGameRunning(false);
  };

  const changeOptions = (mood, tense, verbEnding, pattern) => {
    setSelectedMood(mood);
    setSelectedTense(tense);
    setSelectedVerbEnding(verbEnding);
    setSelectedPattern(pattern);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (selectedVerbEnding === "all" && selectedPattern === "both") {
      fetch(`http://localhost:5000/verbs/${selectedMood}/${selectedTense}`)
        .then((res) => res.json())
        .then((data) => setVerbsData(data));
    } else {
      fetch(
        `http://localhost:5000/verbs/${selectedMood}/${selectedTense}/${selectedVerbEnding}/${selectedPattern}`
      )
        .then((res) => res.json())
        .then((data) => setVerbsData(data));
    }
  }, [selectedMood, selectedTense, selectedVerbEnding, selectedPattern]);

  return (
    <div className="App">
      <Header openOptionsModal={openOptionsModal}></Header>
      <OptionsModal
        isActive={isOptionsModalActive}
        setIsActive={setIsOptionsModalActive}
        applySelections={changeOptions}
      ></OptionsModal>
      <Game
        mood={selectedMood}
        tense={selectedTense}
        verbsData={verbsData}
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
      ></Game>
    </div>
  );
}

export default App;
