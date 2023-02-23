import { combineReducers } from "redux";
import { weatherInfo } from "./weatherReducer.js";

//combine reducers
const reducers = combineReducers({
  weatherInfo: weatherInfo,
});

export default reducers;
