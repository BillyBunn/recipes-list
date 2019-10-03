import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Step from "./RecipeStep";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const Recipe = props => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("useEffect");
    props.findCurrentRecipe();
    setLoading(false);
  }, []);

  const handleTempSelect = e => {
    props.setTempUnits(e.target.value);
  };

  return (
    <StyledRecipe>
      {!loading && (
        <>
          <h2>Recipe: {props.recipe.title}</h2>
          <p>
            <strong>Description: </strong>
            {props.recipe.description}
          </p>
          <Step step={props.step} />
          <label>
            Units
            <select value={props.tempUnits} onChange={handleTempSelect}>
              <option value="fa">Fahrenheit</option>
              <option value="ce">Celcius</option>
            </select>
          </label>
        </>
      )}
    </StyledRecipe>
  );
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.recipe_id;
  return {
    recipe: state.currentRecipe.currentRecipe,
    step: state.currentRecipe.step,
    tempUnits: state.currentRecipe.tempUnits,
    temp: state.currentRecipe.temp,
    time: state.currentRecipe.time
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let id = ownProps.match.params.recipe_id;
  return {
    findCurrentRecipe: () => dispatch(actions.findCurrentRecipe(id)),
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
