import React, { useState, useEffect } from "react";

const Test = props => {
  const [recipeId, setRecipeId] = useState("default");
  useEffect(() => {
    let id = props.match.params.recipe_id;
    setRecipeId(id);
  }, []);
  return (
    <div>
      <h4>recipes/{recipeId}</h4>
    </div>
  );
};

export default Test;
