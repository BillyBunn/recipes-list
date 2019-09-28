import React from "react";
// import RecipeFilter from "./RecipeFilter";
import Recipe from "./Recipe";
import RecipeList from "./RecipeList";
import recipes from "../recipes.json";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = () => (
  <div>
    <Router>
      {recipes.map(recipe => (
        <Route key={recipe._id} path={`/${recipe._id}`}>
          <Recipe recipe={recipe} />
        </Route>
      ))}
      <h3>Recipes</h3>

      <RecipeList recipes={recipes} />
    </Router>
  </div>
);

export default App;
