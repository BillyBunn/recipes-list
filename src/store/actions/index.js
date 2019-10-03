let nextTodoId = 0;
export const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text
});

export const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter
});

export const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export const setCurrentRecipe = recipe => ({
  type: "SELECT_RECIPE",
  recipe
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
