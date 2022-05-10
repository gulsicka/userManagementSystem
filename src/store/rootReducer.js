import { combineReducers } from "@reduxjs/toolkit";
import app from "./app/index";

const rootReducer = combineReducers({
  app,
});

export default rootReducer;
