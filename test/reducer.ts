import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import * as actions from "./actions.js";

export interface ITestState {
  array: string[];
  value: string;
}

const testInitialState: ITestState = {
  array: [],
  value: "",
};

const testReducer = createReducer(testInitialState, (builder) =>
  builder.addCase(actions.setValue, (state, { payload }) => ({
    ...state,
    value: payload,
  })),
);

export const initialState = {
  test: testInitialState,
};

export default combineReducers({
  test: testReducer,
});
