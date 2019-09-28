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
        <h5>
          {currentStep + 1}. {steps[currentStep].title}
        </h5>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Recipe;
