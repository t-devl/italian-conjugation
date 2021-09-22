import React from "react";

export default function Score({ numerator, denominator }) {
  return (
    <div className="score">
      <sup className="score__numerator">{numerator}</sup>
      <span className="score__slash">&frasl;</span>
      <sub className="score__denominator">{denominator}</sub>
    </div>
  );
}
