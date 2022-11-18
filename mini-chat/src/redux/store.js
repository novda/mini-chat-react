import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = compose(...enhancers);

const store = configureStore({
  reducer: rootReducer,
  composedEnhancers,
});

export default store;
