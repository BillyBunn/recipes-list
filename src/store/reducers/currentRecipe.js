let initialState = {
  recipe: null,
  stepNo: 0,
  tempUnits: "fa",
  temp: 0,
  time: 0,
  doneness: null
};

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_RECIPE": {
      let recipe = action.payload;
      let { time, temp } = createRange(recipe.steps[state.stepNo].timeTemp);
      console.log("time", time, "temp", temp);
      return { ...state, recipe, time, temp, stepNo: 0, doneness: null };
    }
    case "NEXT_STEP": {
      console.log("NEXT_STEP");
      let { time, temp } = createRange(
        state.recipe.steps[state.stepNo].timeTemp
      );
      return { ...state, stepNo: state.stepNo + 1, time, temp, doneness: "" };
    }
    case "PREV_STEP": {
      let { time, temp } = createRange(
        state.recipe.steps[state.stepNo].timeTemp
      );
      return { ...state, stepNo: state.stepNo - 1, time, temp, doneness: "" };
    }
    case "SET_TEMP_UNITS": {
      return { ...state, tempUnits: action.tempUnits };
    }

    case "SET_DONENESS": {
      let doneness = action.doneness;
      if (doneness) {
        let selection = state.recipe.steps[state.stepNo].timeTemp.find(
          option => option.doneness === doneness
        );
        let time = convertMS(selection.time).display;
        // console.log("selection", selection);
        let temp = selection.temp[state.tempUnits];
        return { ...state, doneness, time, temp };
      } else {
        let { time, temp } = createRange(
          state.recipe.steps[state.stepNo].timeTemp
        );
        return { ...state, doneness: "", time, temp };
      }
    }

    default:
      return state;
  }
};

const createRange = arrOfTimetemps => {
  let { time, temp } = arrOfTimetemps.reduce(
    (acc, val) => {
      let { time, temp } = val;
      temp = temp["fa"];
      if (time < acc.time.min) acc.time.min = time;
      if (time > acc.time.max) acc.time.max = time;
      if (temp < acc.temp.min) acc.temp.min = temp;
      if (temp > acc.temp.max) acc.temp.max = temp;
      return acc;
    },
    {
      time: { min: Math.min(), max: Math.max() },
      temp: { min: Math.min(), max: Math.max() }
    }
  );

  return {
    time: `${convertMS(time.min).display} – ${convertMS(time.max).display}`,
    temp: `${temp.min} – ${temp.max}`
  };
};

function convertMS(milliseconds) {
  let hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  hours = hours % 24;

  const makeDisplay = num => {
    return num > 0
      ? num.toString().length < 2
        ? "0" + num.toString()
        : num.toString()
      : "00";
  };

  let display = `${makeDisplay(hours)}:${makeDisplay(minutes)}:${makeDisplay(
    seconds
  )}`;

  return {
    hours,
    minutes,
    seconds,
    display
  };
}

export default recipes;
