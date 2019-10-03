import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const Step = props => {
  const { currentStep, step, currentRecipe, tempUnits } = props;
  const { title, description, doneness, time, temp } = currentStep;
  const firstStep = step === 0;
  const lastStep = step >= currentRecipe.steps.length - 1;
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
        {title}
      </h3>
      <p className="recipe-description">
        <strong>Description:</strong>
        <br />
        {description}
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
        Time (hh:mm:ss):
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
    currentStep: state.currentRecipe.currentRecipe.steps[idx],
    currentRecipe: state.currentRecipe.currentRecipe,
    tempUnits: state.currentRecipe.tempUnits
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nextStep: () => dispatch(actions.nextStep()),
    prevStep: () => dispatch(actions.prevStep()),
    changeDoneness: doneness => dispatch(actions.changeDoneness(doneness))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step);
