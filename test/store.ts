import {
  applyMiddleware,
  compose,
  createStore as reduxStore,
  DeepPartial,
  Middleware,
} from "redux";
import merge from "ts-deepmerge";

import rootReducer, { initialState as rootInitialState } from "./reducer";

export type TStoreState = typeof rootInitialState;

export const createStore = (
  initialState: DeepPartial<TStoreState>,
  middlewares: Middleware[] = []
) =>
  reduxStore(
    rootReducer,
    merge(rootInitialState, initialState),
    compose(applyMiddleware(...middlewares))
  );
