import React, { useEffect, useState, useRef } from "react";
import RevealAnswer from "./RevealAnswer";
import Score from "./Score";
import Timer from "./Timer";

export default function Game({
  mood,
  tense,
  verbsData,
  isGameRunning,
  setIsGameRunning,
}) {
  const [userInput, setUserInput] = useState("");
  const [lastSubmittedAnswer, setLastSubmittedAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [currentVerbData, setCurrentVerbData] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [indexOfLastVerb, setIndexOfLastVerb] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [isAnswerAvailable, setIsAnswerAvailable] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const inputRef = useRef(null);
  const inputPattern = new RegExp("^[a-zA-Z\\s]+$");

  useEffect(() => {
    if (!isGameOver) {
      setNumberOfCorrectAnswers(0);
      setNumberOfAttempts(0);
    }
  }, [isGameOver]);

  useEffect(() => {
    setUserInput("");
    setErrorMessage("");
    inputRef.current.focus();
    setNumberOfCorrectAnswers(0);
    setNumberOfAttempts(0);
    selectVerb();
    setIsGameOver(true);
  }, [verbsData]);

  useEffect(() => {
    if (currentVerbData) {
      setAnswer(currentVerbData.conjugation.split("/"));
    }
  }, [currentVerbData]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [userInput]);

  const selectVerb = () => {
    let index = Math.floor(Math.random() * verbsData.length);
    while (index === indexOfLastVerb) {
      index = Math.floor(Math.random() * verbsData.length);
    }
    setCurrentVerbData(verbsData[index]);
    setIndexOfLastVerb(index);
    if (isAnswerAvailable) {
      setIsAnswerAvailable(false);
    }
    if (isAnswerVisible) {
      setIsAnswerVisible(false);
    }
  };

  const addAccent = (letter) => {
    setUserInput(userInput + letter);
    inputRef.current.focus();
  };

  const isInputValid = () => {
    if (userInput.trim() === "") {
      setErrorMessage("Input cannot be empty.");
      return false;
    }
    if (!inputPattern.test(userInput)) {
      setErrorMessage("Input must be made up of letters.");
      return false;
    }
    if (
      userInput !== currentVerbData.conjugation &&
      userInput === lastSubmittedAnswer
    ) {
      setErrorMessage("Please enter a different answer.");
      return false;
    }
    return true;
  };

  const isAnswerCorrect = () => {
    for (let i = 0; i < answer.length; i++) {
      if (userInput.toLowerCase() === answer[i]) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastSubmittedAnswer(userInput);
    if (isInputValid()) {
      if (isAnswerCorrect()) {
        if (!isAnswerVisible) {
          setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
        }
        setUserInput("");
        selectVerb();
      } else {
        setErrorMessage("Incorrect. Try again.");
        setIsAnswerAvailable(true);
      }
      setNumberOfAttempts(numberOfAttempts + 1);
    }
  };

  return (
    <div className="game">
      <p className="game__chosen-options">
        <span className="game__mood">{mood}</span>{" "}
        <span className="game__tense">{tense}</span>
      </p>
      <form className="game__form" onSubmit={handleSubmit}>
        <label className="game__label">
          {currentVerbData
            ? currentVerbData.subject
              ? `${currentVerbData.verb} (${currentVerbData.subject})`
              : `${currentVerbData.verb}`
            : ""}
        </label>
        <input
          className={`game__input ${errorMessage ? "game__input--error" : ""}`}
          ref={inputRef}
          value={userInput}
          disabled={!isGameRunning}
          onChange={(e) => setUserInput(e.target.value)}
        ></input>

        <div className="game__accents">
          <button
            className="game__accent-btn"
            type="button"
            disabled={!isGameRunning}
            onClick={() => addAccent("à")}
          >
            à
          </button>
          <button
            className="game__accent-btn"
            type="button"
            disabled={!isGameRunning}
            onClick={() => addAccent("è")}
          >
            è
          </button>
          <button
            className="game__accent-btn"
            type="button"
            disabled={!isGameRunning}
            onClick={() => addAccent("ì")}
          >
            ì
          </button>
          <button
            className="game__accent-btn"
            type="button"
            disabled={!isGameRunning}
            onClick={() => addAccent("ò")}
          >
            ò
          </button>
          <button
            className="game__accent-btn"
            type="button"
            disabled={!isGameRunning}
            onClick={() => addAccent("ù")}
          >
            ù
          </button>
        </div>
        <p className="game__error-message">{errorMessage}</p>
      </form>
      <Timer
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
      ></Timer>
      <Score
        numerator={numberOfCorrectAnswers}
        denominator={numberOfAttempts}
      ></Score>
      {isAnswerAvailable && isGameRunning ? (
        <RevealAnswer
          answer={currentVerbData.conjugation}
          isAnswerVisible={isAnswerVisible}
          setIsAnswerVisible={setIsAnswerVisible}
        ></RevealAnswer>
      ) : null}
    </div>
  );
}
