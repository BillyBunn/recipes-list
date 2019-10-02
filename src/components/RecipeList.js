import React from "react";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes, selectRecipe }) => (
  <ul>
    {recipes.map(recipe => (
      <li key={recipe._id}>
        <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
      </li>
    ))}
  </ul>
);

export default RecipeList;
