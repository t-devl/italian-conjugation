import React, { useEffect, useState, useRef } from "react";
import AnsweredIncorrectlyModal from "./AnsweredIncorrectlyModal";
import RevealAnswer from "./RevealAnswer";
import Score from "./Score";
import Timer from "./Timer";

export default function Game({
  mood,
  tense,
  fetchedVerbsData,
  isGameRunning,
  setIsGameRunning,
}) {
  const [userInput, setUserInput] = useState("");
  const [lastSubmittedAnswer, setLastSubmittedAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [verbsData, setVerbsData] = useState([]);
  const [currentVerbData, setCurrentVerbData] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [indexOfLastVerb, setIndexOfLastVerb] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [isAnswerAvailable, setIsAnswerAvailable] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [answeredIncorrectly, setAnsweredIncorrectly] = useState({});
  const [areIncorrectAnswersVisible, setAreIncorrectAnswersVisible] =
    useState(false);
  const [isFetchedVerbsDataUpdated, setIsFetchedVerbsDataUpdated] =
    useState(false);
  const inputRef = useRef(null);
  const inputPattern = /^\p{L}+((\s|\/)?(\p{L}+|'))*$/u;

  useEffect(() => {
    if (isGameOver) {
      setUserInput("");
      setErrorMessage("");
    } else {
      if (!isFetchedVerbsDataUpdated) {
        setNumberOfCorrectAnswers(0);
        setNumberOfAttempts(0);
        setAnsweredIncorrectly({});
        setAreIncorrectAnswersVisible(false);
        if (isAnswerAvailable) {
          setIsAnswerAvailable(false);
        }
        if (isAnswerVisible) {
          setIsAnswerVisible(false);
        }
      } else {
        setIsFetchedVerbsDataUpdated(false);
      }
    }
  }, [isGameOver]);

  useEffect(() => {
    setVerbsData(fetchedVerbsData);
    setUserInput("");
    setErrorMessage("");
    inputRef.current.focus();
    setNumberOfCorrectAnswers(0);
    setNumberOfAttempts(0);
    setAnsweredIncorrectly({});
    setAreIncorrectAnswersVisible(false);
    setIsGameOver(true);
    setIsFetchedVerbsDataUpdated(true);
  }, [fetchedVerbsData]);

  useEffect(() => {
    if (currentVerbData) {
      setAnswer(currentVerbData.conjugation.split("/"));
    }
  }, [currentVerbData]);

  useEffect(() => {
    if (verbsData.length > 0) {
      selectVerb();
    }
  }, [verbsData]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [userInput]);

  const selectVerb = () => {
    let index = getIndex(verbsData);
    while (index === indexOfLastVerb) {
      index = getIndex(verbsData);
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

  function getIndex(arr) {
    let sumOfWeights = arr.reduce((a, b) => a + b["weight"], 0);
    let randomNum = Math.floor(Math.random() * sumOfWeights);

    for (let i = 0; i < arr.length; i++) {
      sumOfWeights -= arr[i].weight;
      if (randomNum >= sumOfWeights) {
        return i;
      }
    }
  }

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
      setErrorMessage(
        "Input can only include letters, single spaces and apostrophes. Input must start with a letter and end with a letter or an apostrophe."
      );
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
    let userAnswer = userInput.toLowerCase().split("/");
    for (let i = 0; i < userAnswer.length; i++) {
      if (!answer.includes(userAnswer[i])) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLastSubmittedAnswer(userInput);
    if (isInputValid()) {
      if (isAnswerCorrect()) {
        if (!isAnswerVisible) {
          setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
        }
        if (currentVerbData["weight"] > 1 && !isAnswerAvailable) {
          let newVerbData = { ...currentVerbData };
          newVerbData["weight"]--;
          setVerbsData(
            verbsData.map((obj, index) =>
              index === verbsData.indexOf(currentVerbData) ? newVerbData : obj
            )
          );
        } else {
          selectVerb();
        }
        setUserInput("");
      } else {
        setErrorMessage("Incorrect. Try again.");
        setIsAnswerAvailable(true);
        setAnsweredIncorrectly(
          answeredIncorrectly[currentVerbData.conjugation]
            ? {
                ...answeredIncorrectly,
                [currentVerbData.conjugation]: [
                  currentVerbData,
                  answeredIncorrectly[currentVerbData.conjugation][1] + 1,
                ],
              }
            : {
                ...answeredIncorrectly,
                [currentVerbData.conjugation]: [currentVerbData, 1],
              }
        );
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
      {isGameOver && Object.keys(answeredIncorrectly).length > 0 ? (
        <button
          className="game__modal-btn"
          onClick={() => setAreIncorrectAnswersVisible(true)}
        >
          View the ones you got wrong
        </button>
      ) : null}
      {areIncorrectAnswersVisible ? (
        <AnsweredIncorrectlyModal
          conjugationsData={answeredIncorrectly}
          setIsVisible={setAreIncorrectAnswersVisible}
        ></AnsweredIncorrectlyModal>
      ) : null}
    </div>
  );
}
