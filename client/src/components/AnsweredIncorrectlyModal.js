import React, { useEffect, useState } from "react";

export default function AnsweredIncorrectlyModal({
  conjugationsData,
  setIsVisible,
}) {
  const [sortedConjugationsData, setSortedConjugationsData] = useState([]);

  useEffect(() => {
    setSortedConjugationsData(
      Object.entries(conjugationsData)
        .sort((a, b) => b[1][1] - a[1][1])
        .map((arr) => arr[1][0])
    );
  }, [conjugationsData]);

  return (
    <div className="answered-incorrectly">
      <div className="answered-incorrectly__modal">
        <p className="answered-incorrectly__title">In order of frequency:</p>
        <ul className="answered-incorrectly__list">
          {sortedConjugationsData.map((item, index) => (
            <li className="answered-incorrectly__item" key={index}>
              {item.verb} ({item.subject}) - {item.conjugation}
            </li>
          ))}
        </ul>
        <button
          className="answered-incorrectly__close-btn"
          onClick={() => setIsVisible(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
