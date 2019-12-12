import * as React from "react";
import { Provider } from "react-redux";
import { AnyAction, DeepPartial, Middleware, Store } from "redux";
import merge from "ts-deepmerge";

import Wrapper from "./Wrapper";

export default abstract class WrapperWithRedux<
  C extends React.ComponentType<any>,
  S,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends Wrapper<C, P> {
  // Properties that remain throughout instance lifecycle
  protected defaultReduxState: DeepPartial<S> = {};

  // Scenario-specific properties that are cleared whenever shallow/mount/render are called
  protected dispatchedActions: AnyAction[] = [];
  protected scenarioReduxState: DeepPartial<S> = {};
  protected reduxStore: Store<S> | undefined = undefined;

  public get reduxHistory() {
    return this.dispatchedActions;
  }

  public get store() {
    return this.reduxStore;
  }

  protected get mergedReduxState(): S {
    return merge(this.defaultReduxState, this.scenarioReduxState) as S;
  }

  public withDefaultReduxState = (state: DeepPartial<S>) => {
    this.defaultReduxState = state;

    return this;
  };

  public withReduxState = (state: DeepPartial<S>) => {
    this.scenarioReduxState = state;

    return this;
  };

  public render = () => {
    this.reset();

    throw new Error(
      "The 'render' method is not supported when mounting a connected component. Use 'mount' instead and call .render() on the returned wrapper."
    );
  };

  public shallow = () => {
    this.reset();

    throw new Error(
      "The 'shallow' method is not supported when mounting a connected component. Use 'mount' instead."
    );
  };

  public resetReduxHistory = () => {
    this.dispatchedActions = [];
  };

  protected abstract createStore(
    initialState: DeepPartial<S>,
    middlewares: Middleware[]
  ): Store;

  protected defineStore = () => {
    this.reduxStore = this.createStore(this.mergedReduxState, [
      this.reduxHistoryMiddleware
    ]);

    return this.reduxStore;
  };

  protected reduxHistoryMiddleware: Middleware = () => next => action => {
    this.dispatchedActions.push(action);
    return next(action);
  };

  protected WrappingComponent: React.FC = ({ children }) => (
    <Provider store={this.defineStore()}>{children}</Provider>
  );

  protected reset() {
    super.reset();

    this.scenarioReduxState = {};
    this.dispatchedActions = [];
  }
}
