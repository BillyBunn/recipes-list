import recipeData from "../../recipes.json";

let initialState = {
  recipes: recipeData,
  currentRecipe: recipeData[0],
  step: 0,
  tempUnits: "fa",
  temp: 0,
  time: 0
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
    case "SET_TEMP_UNITS":
      return { ...state, tempUnits: action.tempUnits };

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
  return {
    time: `${time.min} – ${time.max}`,
    temp: `${temp.min} – ${temp.max}`
  };
};

export default recipes;
