import React, { useState } from "react";

export default function Game({ mood, tense, verbData, selectVerb }) {
  const [userInput, setUserInput] = useState("");

  const addAccent = (letter) => {
    setUserInput(userInput + letter);
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
          {verbData ? `${verbData.verb} (${verbData.subject})` : ""}
        </label>
        <input
          className="game__input"
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
