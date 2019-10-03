import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Timer from "./Timer";

const Step = ({ currentRecipe, nextStep, prevStep, changeDoneness }) => {
  const { recipe, stepNo, tempUnits, temp, time, doneness } = currentRecipe;
  const { title, description, timeTemp } = recipe.steps[stepNo];

  const firstStep = stepNo === 0;
  const lastStep = stepNo >= recipe.steps.length - 1;
  const handleNext = () => {
    if (!lastStep) nextStep();
  };
  const handlePrev = () => {
    if (!firstStep) prevStep();
  };
  const handleDonenessChange = e => {
    changeDoneness(e.target.value);
  };

  return (
    <div>
      <h3>
        Step {stepNo + 1}:<br />
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
          {timeTemp.map(({ doneness }) => (
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
      <div>
        Time (hh:mm:ss):
        <br />
        {doneness ? <Timer totalTime={time} /> : time.display}
      </div>
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
  return {
    currentRecipe: state.currentRecipe
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
