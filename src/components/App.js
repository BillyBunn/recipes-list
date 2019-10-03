import React from "react";
import Recipe from "./Recipe";
import RecipeList from "./RecipeList";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const App = ({ recipes }) => (
  <div>
    <GlobalStyle />
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

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
`;

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(mapStateToProps)(App);
