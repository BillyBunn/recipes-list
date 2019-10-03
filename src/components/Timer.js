import React, { useState } from "react";

const Timer = ({ totalTime }) => {
  const [time, setTime] = useState(totalTime);
  const [ticking, setTicking] = useState(false);

  const startTimer = () => {
    if (!ticking) setInterval(tick, 1000);
    if (ticking) clearInterval(tick);
    setTicking(!ticking);
  };

  const tick = () => {
    console.log("tick", time.seconds);
    let { hours, minutes, seconds } = time;
    seconds -= 1;
    setTime({ seconds });
  };

  return (
    <div>
      <span>{time.seconds}</span>
      <button onClick={startTimer}>{ticking ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Timer;
