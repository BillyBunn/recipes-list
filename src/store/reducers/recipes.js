import recipeData from "../../recipes.json";

let initialState = { currentRecipe: recipeData[0], list: recipeData };

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECIPE":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case "SELECT_RECIPE":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default recipes;
