import { configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { merge } from "ts-deepmerge";

import rootReducer, { initialState as rootInitialState } from "./reducer.js";
import { DeepPartial } from "../src/types.js";

export type TStoreState = typeof rootInitialState;

export const createStore = (
  initialState: DeepPartial<TStoreState>,
  middlewares: Middleware[] = [],
) =>
  configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
        middlewares || [],
      ),
    preloadedState: merge(rootInitialState, initialState) as any,
    reducer: rootReducer,
  });
