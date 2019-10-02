import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const Recipe = ({ recipe }) => {
  const { title, description, steps } = recipe;

  const [currentStep, setCurrentStep] = useState(0);
  const firstStep = currentStep === 0;
  const lastStep = currentStep >= steps.length - 1;
  const handleNext = () => {
    if (!lastStep) setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    if (!firstStep) setCurrentStep(currentStep - 1);
  };

  const [tempUnits, setTempUnits] = useState("fa");
  const handleTempSelect = e => {
    setTempUnits(e.target.value);
  };

  return (
    <StyledRecipe>
      <h2>Recipe: {title}</h2>
      <p>
        <strong>Description: </strong>
        {description}
      </p>

      <Step
        step={steps[currentStep]}
        num={currentStep + 1}
        tempUnits={tempUnits}
        handlePrev={handlePrev}
        handleNext={handleNext}
        firstStep={firstStep}
        lastStep={lastStep}
      />

      <label>
        Units
        <select value={tempUnits} onChange={handleTempSelect}>
          <option value="fa">Fahrenheit</option>
          <option value="ce">Celcius</option>
        </select>
      </label>
    </StyledRecipe>
  );
};

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
  console.log(range);

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

const StyledRecipe = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  flex-flow: column nowrap;
  margin: 0 auto;
  max-width: 30em;
  > div {
    align-items: center;
    border: 2px solid black;
    border-radius: 8px;
    display: flex;
    flex-flow: column nowrap;
    padding: 1em;
    > h3 {
      margin: 0;
      text-align: center;
    }
    > p {
      text-align: center;
    }
  }
  > label {
    margin: 1em auto;
  }
`;

export default Recipe;
