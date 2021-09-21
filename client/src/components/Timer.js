import React, { useEffect, useState } from "react";

export default function Timer({
  isGameRunning,
  setIsGameRunning,
  isGameOver,
  setIsGameOver,
}) {
  const [countDownFrom, setCountDownFrom] = useState(300000);
  const [startTime, setStartTime] = useState(0);
  const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState(300000);
  const [minutesLeft, setMinutesLeft] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const startTimer = () => {
    setStartTime(Date.now());
    setIsGameRunning(true);
    setIsGameOver(false);
  };

  const pauseTimer = () => {
    setIsGameRunning(false);
    setCountDownFrom(timeLeftInMilliseconds);
  };

  useEffect(() => {
    let interval = null;
    if (timeLeftInMilliseconds < 1000) {
      setIsGameRunning(false);
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
      setCountDownFrom(300000);
      setStartTime(0);
      setTimeLeftInMilliseconds(300000);
      setMinutesLeft(5);
      setSecondsLeft(0);
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
      <div className="timer__time-left">
        {minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}:
        {secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}
      </div>
    </div>
  );
}
