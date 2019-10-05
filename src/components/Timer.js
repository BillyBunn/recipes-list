import React, { useState } from "react";

const Timer = ({ totalTime }) => {
  const [time, setTime] = useState(100);
  const [seconds, setSeconds] = useState(100);
  const [ticking, setTicking] = useState(false);
  const timer = 0;
  const startTimer = () => {
    if (timer === 0 && seconds > 0) {
      timer = setInterval(tick, 1000);
    }
  };

  const tick = () => {
    // Remove one second, set state so a re-render happens.
    setTime(seconds - 1);
    setSeconds(seconds - 1);

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(timer);
    }
  };

  return (
    <div>
      <span>{time}</span>
      <button onClick={startTimer}>{ticking ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Timer;
