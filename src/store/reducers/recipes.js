import recipeData from "../../recipes.json";

let initialState = recipeData;

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      let newRecipe = action.payload;
      return [...state, newRecipe];

    case "DELETE_RECIPE":
      let id = action.payload;
      let recipes = state.filter(recipe => recipe._id !== id);
      return recipes;

    default:
      return state;
  }
};

export default recipes;
