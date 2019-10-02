import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const RecipeList = ({ recipes, selectRecipe, setCurrent }) => (
  <>
    <h3>Recipes</h3>
    <ul>
      {recipes.map(recipe => (
        <li key={recipe._id} onClick={() => setCurrent(recipe)}>
          <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
        </li>
      ))}
    </ul>
  </>
);

const mapDispatchToProps = (dispatch, getState) => ({
  setCurrent: recipe => dispatch(actions.setCurrentRecipe(recipe))
});

export default connect(
  null,
  mapDispatchToProps
)(RecipeList);
