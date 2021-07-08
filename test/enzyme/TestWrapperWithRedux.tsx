import * as React from "react";
import { DeepPartial, Middleware } from "redux";

import WrapperWithRedux from "../../src/enzyme/WrapperWithRedux";
import { createStore, TStoreState } from "../store";

export default class TestWrapperWithRedux<
  C extends React.ComponentType<any>,
  S extends {} = TStoreState,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends WrapperWithRedux<C, S, P> {
  protected createStore(
    initialState: DeepPartial<S>,
    middlewares: Middleware[]
  ) {
    return createStore(initialState, middlewares);
  }
}
