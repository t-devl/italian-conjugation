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
  const [verbsData, setVerbsData] = useState([]);
  const [currentVerbData, setCurrentVerbData] = useState({});
  const [isGameOver, setIsGameOver] = useState(false);

  const isInitialMount = useRef(true);

  const openOptionsModal = () => {
    setIsOptionsModalActive(true);
    setIsGameRunning(false);
  };

  const changeOptions = (mood, tense, verbEnding) => {
    setSelectedMood(mood);
    setSelectedTense(tense);
    setSelectedVerbEnding(verbEnding);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (selectedVerbEnding === "all") {
      fetch(`http://localhost:5000/verbs/${selectedMood}/${selectedTense}`)
        .then((res) => res.json())
        .then((data) => setVerbsData(data));
    } else {
      fetch(
        `http://localhost:5000/verbs/${selectedMood}/${selectedTense}/${selectedVerbEnding}`
      )
        .then((res) => res.json())
        .then((data) => setVerbsData(data));
    }
  }, [selectedMood, selectedTense, selectedVerbEnding]);

  const selectVerb = () => {
    let index = Math.floor(Math.random() * verbsData.length);
    setCurrentVerbData(verbsData[index]);
  };

  useEffect(() => {
    selectVerb();
    setIsGameOver(true);
  }, [verbsData]);

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
        verbData={currentVerbData}
        selectVerb={selectVerb}
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
      ></Game>
    </div>
  );
}

export default App;
