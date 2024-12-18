import {
  cleanup,
  queries as defaultQueries,
  render,
} from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { Middleware, Store } from "redux";
import { merge } from "ts-deepmerge";

import { queries as customQueries } from "./queries.js";
import { TRenderResult, Wrapper } from "./Wrapper.js";
import { DeepPartial } from "../types.js";

const queries = {
  ...defaultQueries,
  ...customQueries,
};

type TResultWithStore<P, S> = TRenderResult<P> & {
  store: Store<S>;
};

/**
 * A class to provide a simple method of setting up your React component tests for apps that use Redux.
 */
export abstract class WrapperWithRedux<
  C extends React.ComponentType<any>,
  S extends Record<string, any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>,
> extends Wrapper<C, P> {
  // region Properties that remain throughout instance lifecycle

  /**
   * Determines whether arrays in Redux state are merged when rendering the component.
   */
  protected isMergingReduxArrays = true;

  /**
   * The default Redux store state for all test scenarios for the current test suite.
   *
   * This is set by the `.withDefaultReduxState()` method.
   */
  protected defaultReduxState: DeepPartial<S> = {};

  // endregion

  // region Scenario-specific properties that are cleared whenever shallow/mount/render are called

  /**
   * An array of all actions dispatched during the test scenario lifecycle
   */
  protected dispatchedActions: any[] = [];

  /**
   * The Redux store state specific to the current test scenario.
   *
   * This is set by the `.withReduxState()` method and cleared after `.mount()` is called.
   */
  protected scenarioReduxState: DeepPartial<S> = {};

  /**
   * The Redux store instance.
   *
   * This is set during the `.beforeRender()` hook.
   */
  protected reduxStore: Store<S> | undefined = undefined;

  // endregion

  /**
   * Returns an array of all actions that were dispatched during the test scenario lifecycle
   */
  public get reduxHistory() {
    return this.dispatchedActions;
  }

  /**
   * Returns the merged Redux store state used by the current test scenario
   */
  protected get mergedReduxState(): S {
    return merge.withOptions(
      { mergeArrays: this.isMergingReduxArrays },
      this.defaultReduxState,
      this.scenarioReduxState,
    ) as S;
  }

  /**
   * Toggles whether to merge arrays in the Redux state
   *
   * @param value The new value
   */
  public withMergedReduxArrays = (value: boolean) => {
    this.isMergingReduxArrays = value;

    return this;
  };

  /**
   * Sets the default Redux store state used by all test scenarios for the current test suite.
   *
   * This method can be chained with other methods.
   *
   * @param state The partial Redux store state to set
   */
  public withDefaultReduxState = (state: DeepPartial<S>) => {
    this.defaultReduxState = state;

    return this;
  };

  /**
   * Sets the Redux store state used by the current test scenario.
   *
   * This method can be chained with other methods.
   *
   * @param state The partial Redux store state to set
   */
  public withReduxState = (state: DeepPartial<S>) => {
    this.scenarioReduxState = state;

    return this;
  };

  /**
   * Renders the component using the `render` function from `react-testing-library`.
   *
   * Returns the `RenderResult` from `render()`, with `store` included.
   */
  public render = (): TResultWithStore<P, S> => {
    this.dispatchedActions = [];
    this.beforeRender();

    const props = this.defineProps() as P;
    // @ts-ignore
    const result: TResultWithStore<P, S> = render(
      <this.Component {...props} />,
      {
        queries,
        wrapper: this.WrappingComponent,
      },
    );

    this.reset();

    result.store = this.reduxStore!;

    const updateProps = (newProps: Partial<P>) => {
      const merged: P = { ...props, ...newProps };

      result.rerender(<this.Component {...merged} />);
    };

    return {
      ...result,
      updateProps,
    };
  };

  /**
   * Resets the Redux action history
   */
  public resetReduxHistory = () => {
    this.dispatchedActions = [];
  };

  /**
   * The beforeRender hook.
   *
   * This sets the instance of the Redux store used by the current test scenario.
   */
  protected beforeRender = () => {
    cleanup();

    this.reduxStore = this.createStore(this.mergedReduxState, [
      this.reduxHistoryMiddleware,
    ]);
  };

  /**
   * The middleware for keeping track of actions that were dispatched during the test scenario lifecycle
   */
  protected reduxHistoryMiddleware: Middleware = () => (next) => (action) => {
    this.dispatchedActions.push(action);
    return next(action);
  };

  /**
   * The component to wrap the component you're testing - provides the Redux `Provider` component
   */
  protected WrappingComponent: React.FC<React.PropsWithChildren> = ({
    children,
  }) => <Provider store={this.reduxStore!}>{children}</Provider>;

  /**
   * Resets all scenario-specific props, children and Redux store state for the instance
   */
  // eslint-disable-next-line
  protected reset() {
    super.reset();

    this.scenarioReduxState = {};
  }

  /**
   * The method used to create your app's Redux store instance.
   *
   * You must implement this method when extending this class.
   *
   * @param initialState  The initial Redux store state to create the store instance with
   * @param middlewares   The middlewares to create the Redux store with
   */
  protected abstract createStore(
    initialState: DeepPartial<S>,
    middlewares: Middleware[],
  ): Store;
}
