import React, { useState } from "react";

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
  return (
    <>
      <h5>
        {num}. {step.title}
      </h5>
      <p>{step.description}</p>
      <p>Temp</p>
      <p>Time</p>
    </>
  );
};

export default Recipe;
