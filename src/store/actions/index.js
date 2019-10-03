export const findCurrentRecipe = recipeId => {
  return (dispatch, getState) => {
    let selectedRecipe = getState().recipes.find(
      recipe => recipe._id === recipeId
    );
    dispatch(setCurrentRecipe(selectedRecipe));
  };
};
export const setCurrentRecipe = recipe => ({
  type: "SET_CURRENT_RECIPE",
  payload: recipe
});

export const nextStep = () => ({
  type: "NEXT_STEP"
});

export const prevStep = () => ({
  type: "PREV_STEP"
});

export const setTempUnits = tempUnits => ({
  type: "SET_TEMP_UNITS",
  tempUnits
});

export const changeDoneness = doneness => ({
  type: "SET_DONENESS",
  doneness
});
