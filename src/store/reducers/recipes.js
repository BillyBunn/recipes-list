import moment from "moment";
import recipeData from "../../recipes.json";

let initialState = {
  recipes: recipeData,
  currentRecipe: recipeData[0],
  step: 0,
  tempUnits: "fa",
  temp: 0,
  time: 0,
  doneness: ""
};

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_RECIPE": {
      let id = action.recipe;
      let currentRecipe = state.recipes.find(recipe => recipe._id === id);
      let { time, temp } = createRange(
        currentRecipe.steps[state.step].timeTemp
      );
      return { ...state, currentRecipe, time, temp, step: 0, doneness: "" };
    }
    case "NEXT_STEP": {
      let { time, temp } = createRange(
        state.currentRecipe.steps[state.step].timeTemp
      );
      return { ...state, step: state.step + 1, time, temp, doneness: "" };
    }
    case "PREV_STEP": {
      let { time, temp } = createRange(
        state.currentRecipe.steps[state.step].timeTemp
      );
      return { ...state, step: state.step - 1, time, temp, doneness: "" };
    }
    case "SET_TEMP_UNITS": {
      return { ...state, tempUnits: action.tempUnits };
    }

    case "SET_DONENESS": {
      let doneness = action.doneness;
      if (doneness) {
        let selection = state.currentRecipe.steps[state.step].timeTemp.find(
          option => option.doneness === doneness
        );
        let time = convertMS(selection.time).display;
        return { ...state, doneness, time };
      } else {
        let { time, temp } = createRange(
          state.currentRecipe.steps[state.step].timeTemp
        );
        return { ...state, doneness: "", time, temp };
      }
    }

    default:
      return state;
  }
};

const createRange = arrOfTimetemps => {
  let { time, temp } = arrOfTimetemps.reduce(
    (acc, val) => {
      let { time, temp } = val;
      temp = temp["fa"];
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

  return {
    time: `${convertMS(time.min).display} – ${convertMS(time.max).display}`,
    temp: `${temp.min} – ${temp.max}`
  };
};

function convertMS(milliseconds) {
  let hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  hours = hours % 24;

  const makeDisplay = num => {
    return num > 0
      ? num.toString().length < 2
        ? "0" + num.toString()
        : num.toString()
      : "00";
  };

  let display = `${makeDisplay(hours)}:${makeDisplay(minutes)}:${makeDisplay(
    seconds
  )}`;

  return {
    hours,
    minutes,
    seconds,
    display
  };
}

export default recipes;
