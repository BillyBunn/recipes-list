import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Step from "./RecipeStep";
import { connect } from "react-redux";
const Recipe = ({ recipe }) => {
  const { title, description, steps } = recipe
    ? recipe
    : {
        title: "loading",
        description: "loading",
        steps: [{ title: "loading", description: "loading", timeTemp: [] }]
      };

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

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.recipe_id;
  return {
    recipe: state.recipes.recipes.find(recipe => recipe._id === id)
  };
};

export default connect(mapStateToProps)(Recipe);
