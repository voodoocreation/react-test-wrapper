import * as React from "react";
import { Middleware } from "redux";

import { WrapperWithRedux } from "../../src/react-testing-library/WrapperWithRedux.js";
import { DeepPartial } from "../../src/types.js";
import { createStore, TStoreState } from "../store.js";

export class Wrapper<
  C extends React.ComponentType<any>,
  S extends Record<string, any> = TStoreState,
  P extends React.ComponentProps<C> = React.ComponentProps<C>,
> extends WrapperWithRedux<C, S, P> {
  protected createStore = (
    initialState: DeepPartial<S>,
    middlewares: Middleware[],
  ) => createStore(initialState, middlewares);
}
