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
      let { time, temp } = calcRange(currentRecipe.steps[state.step].timeTemp);
      return { ...state, currentRecipe, time, temp, step: 0 };
    }
    case "NEXT_STEP": {
      let { time, temp } = calcRange(
        state.currentRecipe.steps[state.step].timeTemp
      );
      return { ...state, step: state.step + 1, time, temp };
    }
    case "PREV_STEP": {
      let { time, temp } = calcRange(
        state.currentRecipe.steps[state.step].timeTemp
      );
      return { ...state, step: state.step - 1, time, temp };
    }
    case "SET_TEMP_UNITS": {
      return { ...state, tempUnits: action.tempUnits };
    }

    case "SET_DONENESS": {
      let doneness = action.doneness;
      let selection = state.currentRecipe.steps[state.step].timeTemp.find(
        option => option.doneness === doneness
      );
      console.log("temp", selection);
      let time = selection.time;
      return { ...state, doneness, time };
    }

    default:
      return state;
  }
};

const calcRange = arrOfTimetemps => {
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
  let minTimes = convertMS(time.min);
  for (let prop in minTimes) {
    minTimes[prop] = minTimes[prop].toString();
    if (minTimes[prop].length < 2) minTimes[prop] = "0" + minTimes[prop];
  }
  let min = `${minTimes.hours}:${minTimes.minutes}:${minTimes.seconds}`;
  let maxTimes = convertMS(time.max);
  for (let prop in maxTimes) {
    maxTimes[prop] = maxTimes[prop].toString();
    if (maxTimes[prop].length < 2) maxTimes[prop] = "0" + maxTimes[prop];
  }
  let max = `${maxTimes.hours}:${maxTimes.minutes}:${maxTimes.seconds}`;
  return {
    time: `${min} – ${max}`,
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

  let str = {
    hours: hours.toString(),
    minutes: minutes.toString(),
    seconds: seconds.toString()
  };
  return {
    hours,
    minutes,
    seconds
  };
}

export default recipes;
