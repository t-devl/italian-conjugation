import React, { useEffect, useState } from "react";

export default function Timer({
  isGameRunning,
  setIsGameRunning,
  isGameOver,
  setIsGameOver,
}) {
  const [selectedTime, setSelectedTime] = useState(300000);
  const [countDownFrom, setCountDownFrom] = useState(300000);
  const [startTime, setStartTime] = useState(0);
  const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState(300000);
  const [minutesLeft, setMinutesLeft] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [hasTimerStarted, setHasTimerStarted] = useState(false);

  const selectTime = (time) => {
    setSelectedTime(time);
    setCountDownFrom(time);
    setMinutesLeft(time / 60000);
    setSecondsLeft(0);
    setTimeLeftInMilliseconds(time);
  };

  const startTimer = () => {
    if (!hasTimerStarted) {
      setHasTimerStarted(true);
      setIsGameOver(false);
    }
    setStartTime(Date.now());
    setIsGameRunning(true);
  };

  const pauseTimer = () => {
    setIsGameRunning(false);
    setCountDownFrom(timeLeftInMilliseconds);
  };

  useEffect(() => {
    let interval = null;
    if (timeLeftInMilliseconds < 1000) {
      setIsGameRunning(false);
      setIsGameOver(true);
      setHasTimerStarted(false);
      clearInterval(interval);
    } else if (isGameRunning) {
      interval = setInterval(() => {
        setTimeLeftInMilliseconds(countDownFrom - (Date.now() - startTime));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [timeLeftInMilliseconds, isGameRunning]);

  useEffect(() => {
    setMinutesLeft(Math.floor(timeLeftInMilliseconds / 60000));
    setSecondsLeft(Math.floor((timeLeftInMilliseconds % 60000) / 1000));
  }, [timeLeftInMilliseconds]);

  useEffect(() => {
    if (!isGameRunning && timeLeftInMilliseconds >= 1000) {
      setCountDownFrom(timeLeftInMilliseconds);
    }
  }, [isGameRunning]);

  useEffect(() => {
    if (isGameOver) {
      selectTime(selectedTime);
      setStartTime(0);
      setHasTimerStarted(false);
    }
  }, [isGameOver]);

  return (
    <div className="timer">
      {isGameRunning ? (
        <button className="timer__btn timer__btn--pause" onClick={pauseTimer}>
          Pause
        </button>
      ) : (
        <button className="timer__btn timer__btn--start" onClick={startTimer}>
          Start
        </button>
      )}
      {isGameOver ? (
        <select
          className="timer__select"
          value={selectedTime}
          onChange={(e) => selectTime(e.target.value)}
        >
          <option className="timer__option" value="60000">
            1:00
          </option>
          <option className="timer__option" value="180000">
            3:00
          </option>
          <option className="timer__option" value="300000">
            5:00
          </option>
          <option className="timer__option" value="600000">
            10:00
          </option>
        </select>
      ) : (
        <div className="timer__time-left">
          {minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:
          {secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}
        </div>
      )}
    </div>
  );
}
