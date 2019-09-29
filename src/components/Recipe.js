import React, { useState } from "react";

const TEMP_UNITS = "fa";

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

  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <div>
        <Step step={steps[currentStep]} num={currentStep + 1} />

        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

const Step = ({ step, num }) => {
  const range = step.timeTemp.reduce(
    (acc, val) => {
      let { time, temp } = val;
      temp = temp[TEMP_UNITS];
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

  const time = `${range.time.min} – ${range.time.max}`;
  const temp = `${range.temp.min} – ${range.temp.max}`;

  return (
    <>
      <h5>
        {num}. {step.title}
      </h5>
      <p>{step.description}</p>
      <p>{temp}</p>
      <p>{time}</p>
    </>
  );
};

export default Recipe;
