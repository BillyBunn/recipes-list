import recipeData from "../../recipes.json";

let initialState = {
  recipes: recipeData,
  currentRecipe: {},
  step: 0,
  tempUnits: "fa"
};

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_RECIPE":
      console.log("SELECT_RECIPE");
      return { ...state, currentRecipe: action.recipe, step: 0 };

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

export default recipes;
