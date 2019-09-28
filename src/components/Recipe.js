import React from "react";

const Recipe = ({ recipe }) => {
  const { title, desc, steps } = recipe;
  return (
    <div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
};

export default Recipe;
