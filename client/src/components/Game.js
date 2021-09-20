import React, { useEffect, useState, useRef } from "react";

export default function Game({ mood, tense, verbData, selectVerb }) {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setUserInput("");
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
          {verbData
            ? verbData.subject
              ? `${verbData.verb} (${verbData.subject})`
              : `${verbData.verb}`
            : ""}
        </label>
        <input
          className="game__input"
          ref={inputRef}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></input>

        <div className="game__accents">
          <button
            className="game__accent-btn"
            type="button"
            onClick={() => addAccent("à")}
          >
            à
          </button>
          <button
            className="game__accent-btn"
            type="button"
            onClick={() => addAccent("è")}
          >
            è
          </button>
          <button
            className="game__accent-btn"
            type="button"
            onClick={() => addAccent("ì")}
          >
            ì
          </button>
          <button
            className="game__accent-btn"
            type="button"
            onClick={() => addAccent("ò")}
          >
            ò
          </button>
          <button
            className="game__accent-btn"
            type="button"
            onClick={() => addAccent("ù")}
          >
            ù
          </button>
        </div>
      </form>
    </div>
  );
}
