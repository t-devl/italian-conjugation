import React, { useEffect, useState, useRef } from "react";
import Timer from "./Timer";

export default function Game({
  mood,
  tense,
  verbData,
  selectVerb,
  isGameRunning,
  setIsGameRunning,
  isGameOver,
  setIsGameOver,
}) {
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setUserInput("");
    setErrorMessage("");
    inputRef.current.focus();
  }, [verbData]);

  const addAccent = (letter) => {
    setUserInput(userInput + letter);
    inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === verbData.conjugation) {
      setUserInput("");
      selectVerb();
    } else {
      setErrorMessage("Incorrect. Try again.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [userInput]);

  return (
    <div className="game">
      <p className="game__chosen-options">
        <span className="game__mood">{mood}</span>{" "}
        <span className="game__tense">{tense}</span>
      </p>
      <form className="game__form" onSubmit={handleSubmit}>
        <label className="game__label">
          {verbData
            ? verbData.subject
              ? `${verbData.verb} (${verbData.subject})`
              : `${verbData.verb}`
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
        {errorMessage ? (
          <p className="game__error-message">{errorMessage}</p>
        ) : null}
      </form>
      <Timer
        isGameRunning={isGameRunning}
        setIsGameRunning={setIsGameRunning}
        isGameOver={isGameOver}
        setIsGameOver={setIsGameOver}
      ></Timer>
    </div>
  );
}
