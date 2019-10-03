import { combineReducers } from "redux";
import recipes from "./recipes";
import currentRecipe from "./currentRecipe";

export default combineReducers({
  recipes,
  currentRecipe
});
