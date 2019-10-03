import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const Step = props => {
  const { currentStep, step, temp, time, tempUnits, doneness } = props;
  const firstStep = step === 0;
  const lastStep = step >= 50;
  const handleNext = () => {
    if (!lastStep) props.nextStep();
  };
  const handlePrev = () => {
    if (!firstStep) props.prevStep();
  };
  const handleDonenessChange = e => {
    props.changeDoneness(e.target.value);
  };
  return (
    <div>
      <h3>
        Step {step + 1}:<br />
        {currentStep.title}
      </h3>
      <p className="recipe-description">
        <strong>Description:</strong>
        <br />
        {currentStep.description}
      </p>
      <label>
        Desired doneness
        <select value={doneness} onChange={handleDonenessChange}>
          <option value="">Not specified</option>
          {currentStep.timeTemp.map(({ doneness }) => (
            <option key={doneness} value={doneness}>
              {doneness}
            </option>
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

const mapStateToProps = (state, ownProps) => {
  let idx = ownProps.step;
  return {
    currentStep: state.recipes.currentRecipe.steps[idx],
    tempUnits: state.recipes.tempUnits,
    temp: state.recipes.temp,
    time: state.recipes.time,
    doneness: state.recipes.doneness
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrent: () => dispatch(actions.setCurrentRecipe(id)),
    nextStep: () => dispatch(actions.nextStep()),
    prevStep: () => dispatch(actions.prevStep()),
    setTempUnits: tempUnits => dispatch(actions.setTempUnits(tempUnits)),
    changeDoneness: doneness => dispatch(actions.changeDoneness(doneness))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step);
