import recipeData from "../../recipes.json";

let initialState = {
  recipes: recipeData,
  currentRecipe: {},
  step: 0,
  tempUnits: "fa",
  temp: 0,
  time: 0
};

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_RECIPE": {
      console.log("range", calcRange(action.recipe.steps[state.step].timeTemp));

      console.log("range", calcRange(action.recipe.steps[0].timeTemps));
      return { ...state, currentRecipe: action.recipe, step: 0 };
    }
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_TEMP_UNITS":
      return { ...state, tempUnits: action.tempUnits };

    default:
      return state;
  }
};

const calcRange = arrOfTimetemps => {
  let result = arrOfTimetemps.reduce(
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
  return result;
};

export default recipes;
