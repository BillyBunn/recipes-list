import React, { useEffect } from "react";
import styled from "styled-components";
import Step from "./RecipeStep";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const Recipe = props => {
  useEffect(() => {
    props.setCurrent();
  }, []);

  const { title, description, steps } = props.recipe;
  const firstStep = props.currentStep === 0;
  const lastStep = props.currentStep >= steps.length - 1;
  const handleNext = () => {
    if (!lastStep) props.nextStep();
  };
  const handlePrev = () => {
    if (!firstStep) props.prevStep();
  };

  const handleTempSelect = e => {
    props.setTempUnits(e.target.value);
  };

  return (
    <StyledRecipe>
      <h2>Recipe: {title}</h2>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
      <Step step={props.currentStep} />
      <label>
        Units
        <select value={props.tempUnits} onChange={handleTempSelect}>
          <option value="fa">Fahrenheit</option>
          <option value="ce">Celcius</option>
        </select>
      </label>
    </StyledRecipe>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.recipe_id;
  return {
    recipe: state.recipes.currentRecipe,
    currentStep: state.recipes.step,
    tempUnits: state.recipes.tempUnits,
    currentRecipe: state.recipes.currentRecipe,
    temp: state.recipes.temp,
    time: state.recipes.time
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let id = ownProps.match.params.recipe_id;
  return {
    setCurrent: () => dispatch(actions.setCurrentRecipe(id)),
    nextStep: () => dispatch(actions.nextStep()),
    prevStep: () => dispatch(actions.prevStep()),
    setTempUnits: tempUnits => dispatch(actions.setTempUnits(tempUnits))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);

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
