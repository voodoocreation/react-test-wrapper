import { combineReducers } from "redux";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import * as actions from "./actions";

export interface ITestState {
  array: string[];
  value: string;
}

const testInitialState: ITestState = {
  array: [],
  value: "",
};

const testReducer = reducerWithInitialState(testInitialState).case(
  actions.setValue,
  (state, payload) => ({
    ...state,
    value: payload,
  })
);

export const initialState = {
  test: testInitialState,
};

export default combineReducers({
  test: testReducer,
});
