import React from "react";

export default function RevealAnswer({
  answer,
  isAnswerVisible,
  setIsAnswerVisible,
}) {
  return (
    <div className="reveal-answer">
      <button
        className="reveal-answer__btn"
        onClick={() => setIsAnswerVisible(true)}
      >
        Reveal answer
      </button>
      {isAnswerVisible ? (
        <div className="reveal-answer__answer">{answer}</div>
      ) : (
        ""
      )}
    </div>
  );
}
