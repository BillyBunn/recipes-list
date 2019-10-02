import React from "react";
// import RecipeFilter from "./RecipeFilter";
import Recipe from "./Recipe";
import RecipeList from "./RecipeList";
// import recipes from "../recipes.json";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const App = ({ recipes }) => (
  <div>
    <Router>
      <nav>
        <Link to="/">Recipe List</Link>
      </nav>

      <Switch>
        <Route path="/" exact>
          <RecipeList recipes={recipes} />
        </Route>
        <Route path="/recipes/:recipe_id" component={Recipe} />
      </Switch>
    </Router>
  </div>
);

const mapStateToProps = state => ({
  recipes: state.recipes.recipes
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleClick: () => dispatch(actions.go()),
  handleReset: () => dispatch(actions.reset())
});

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(App);
