import { combineReducers } from "redux";
import recipes from "./recipes";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({
  recipes,
  visibilityFilter
});
