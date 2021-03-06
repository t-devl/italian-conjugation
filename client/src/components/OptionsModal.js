import React, { useEffect, useState } from "react";

export default function OptionsModal({
  isActive,
  setIsActive,
  applySelections,
}) {
  const [mood, setMood] = useState("indicativo");
  const [tense, setTense] = useState("presente");
  const [verbEnding, setVerbEnding] = useState("are");
  const [pattern, setPattern] = useState("regular");
  const [tenseOptions, setTenseOptions] = useState([]);
  const [displayedTenseOptions, setDisplayedTenseOptions] = useState([]);

  const indicativoTenses = [
    "presente",
    "passato prossimo",
    "imperfetto",
    "trapassato prossimo",
    "passato remoto",
    "trapassato remoto",
    "futuro semplice",
    "futuro anteriore",
  ];
  const congiuntivoTenses = ["presente", "passato", "imperfetto", "trapassato"];
  const condizionaleTenses = ["presente", "passato"];
  const imperativoTenses = ["presente"];
  const infinitoTenses = ["passato"];
  const participioTenses = ["presente", "passato"];
  const gerundioTenses = ["presente", "passato"];

  useEffect(() => {
    switch (mood) {
      case "indicativo":
        setTenseOptions(indicativoTenses);
        break;
      case "congiuntivo":
        setTenseOptions(congiuntivoTenses);
        break;
      case "condizionale":
        setTenseOptions(condizionaleTenses);
        break;
      case "imperativo":
        setTenseOptions(imperativoTenses);
        break;
      case "infinito":
        setTenseOptions(infinitoTenses);
        break;
      case "participio":
        setTenseOptions(participioTenses);
        break;
      case "gerundio":
        setTenseOptions(gerundioTenses);
        break;
    }
  }, [mood]);

  useEffect(() => {
    setTense(tenseOptions[0]);
    setDisplayedTenseOptions(
      tenseOptions.map((tense) => (
        <option className="options-form__option" key={tense} value={tense}>
          {tense}
        </option>
      ))
    );
  }, [tenseOptions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsActive(false);
    applySelections(mood, tense, verbEnding, pattern);
  };

  if (isActive) {
    return (
      <div className="options-modal">
        <form
          className="options-modal__options-form options-form"
          onSubmit={handleSubmit}
        >
          <div className="options-form__select-container">
            <label className="options-form__label" htmlFor="mood">
              Mood
            </label>
            <select
              className="options-form__select"
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option className="options-form__option" value="indicativo">
                Indicativo
              </option>
              <option className="options-form__option" value="congiuntivo">
                Congiuntivo
              </option>
              <option className="options-form__option" value="condizionale">
                Condizionale
              </option>
              <option className="options-form__option" value="imperativo">
                Imperativo
              </option>
              <option className="options-form__option" value="infinito">
                Infinito
              </option>
              <option className="options-form__option" value="participio">
                Participio
              </option>
              <option className="options-form__option" value="gerundio">
                Gerundio
              </option>
            </select>
          </div>
          <div className="options-form__select-container">
            <label className="options-form__label" htmlFor="tense">
              Tense
            </label>
            <select
              className="options-form__select"
              id="tense"
              value={tense}
              onChange={(e) => setTense(e.target.value)}
            >
              {displayedTenseOptions}
            </select>
          </div>
          <div className="options-form__select-container">
            <label className="options-form__label" htmlFor="verb-ending">
              Verb ending
            </label>
            <select
              className="options-form__select options-form__select--lowercase"
              id="verb-ending"
              value={verbEnding}
              onChange={(e) => setVerbEnding(e.target.value)}
            >
              <option className="options-form__option" value="are">
                are
              </option>
              <option className="options-form__option" value="ere">
                ere
              </option>
              <option className="options-form__option" value="ire">
                ire
              </option>
              <option className="options-form__option" value="all">
                all verb endings
              </option>
            </select>
          </div>
          <div className="options-form__select-container">
            <label className="options-form__label" htmlFor="pattern">
              Pattern
            </label>
            <select
              className="options-form__select options-form__select--lowercase"
              id="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            >
              <option className="options-form__option" value="regular">
                Regular
              </option>
              <option className="options-form__option" value="irregular">
                Irregular
              </option>
              <option className="options-form__option" value="both">
                Regular + irregular
              </option>
            </select>
          </div>
          <button className="options-form__submit-btn">Apply selections</button>
        </form>
      </div>
    );
  } else {
    return null;
  }
}
