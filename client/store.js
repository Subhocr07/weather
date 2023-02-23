import thunk from "redux-thunk";
import { configureStore, applyMiddleware } from "redux";

// reducers

//middleware
const middleware = applyMiddleware(thunk);

//store
const store = configureStore("", middleware);

export default store;
