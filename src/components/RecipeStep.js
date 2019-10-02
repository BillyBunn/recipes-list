import React from "react";
import moment from "moment";

const Step = ({
  step,
  num,
  tempUnits,
  handlePrev,
  handleNext,
  firstStep,
  lastStep
}) => {
  const range = step.timeTemp.reduce(
    (acc, val) => {
      let { time, temp } = val;
      temp = temp[tempUnits];
      if (time < acc.time.min) acc.time.min = time;
      if (time > acc.time.max) acc.time.max = time;
      if (temp < acc.temp.min) acc.temp.min = temp;
      if (temp > acc.temp.max) acc.temp.max = temp;
      return acc;
    },
    {
      time: { min: Math.min(), max: Math.max() },
      temp: { min: Math.min(), max: Math.max() }
    }
  );

  const time = `${moment.utc(range.time.min).format("mm:ss")} – ${moment
    .utc(range.time.max)
    .format("mm:ss")} minutes`;
  const temp = `${range.temp.min} – ${range.temp.max}`;

  return (
    <div>
      <h3>
        Step {num}:<br />
        {step.title}
      </h3>
      <p className="recipe-description">
        <strong>Description:</strong>
        <br />
        {step.description}
      </p>
      <label>
        Desired doneness
        <select>
          <option value="">Not specified</option>
          {step.timeTemp.map(({ doneness }) => (
            <option value={doneness}>{doneness}</option>
          ))}
        </select>
      </label>
      <p>
        Temperature (&deg;{tempUnits === "fa" ? "F" : "C"}):
        <br />
        {temp}
      </p>
      <p>
        Time:
        <br />
        {time}
      </p>
      <div>
        <button onClick={handlePrev} disabled={firstStep}>
          Prev
        </button>
        <button onClick={handleNext} disabled={lastStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step;
