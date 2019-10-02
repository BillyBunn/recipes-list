import React from "react";
// import RecipeFilter from "./RecipeFilter";
import Recipe from "./Recipe";
import RecipeList from "./RecipeList";
// import recipes from "../recipes.json";
import { connect } from "react-redux";
import Test from "./Test";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = ({ recipes }) => (
  <div>
    <Router>
      <nav>
        <Link to="/">Recipe List</Link>
      </nav>
      <Route path="/" exact>
        <h3>Recipes</h3>
        <RecipeList recipes={recipes} />
      </Route>
      <Route path="/recipes/:recipe_id" component={Recipe} />
    </Router>
  </div>
);

const mapStateToProps = state => ({
  recipes: state.recipes.list
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleClick: () => dispatch(actions.go()),
  handleReset: () => dispatch(actions.reset())
});

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(App);
