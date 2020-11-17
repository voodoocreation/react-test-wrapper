import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { AnyAction, DeepPartial, Middleware, Store } from "redux";
import merge from "ts-deepmerge";

import Wrapper from "./Wrapper";

type TWrapperWithStore<P, S> = ReactWrapper<P> & {
  store: Store<S>;
};

/**
 * A class to provide a simple method of setting up your React component tests for apps that use Redux.
 */
export default abstract class WrapperWithRedux<
  C extends React.ComponentType<any>,
  S,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends Wrapper<C, P> {
  // region Properties that remain throughout instance lifecycle

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
  protected dispatchedActions: AnyAction[] = [];

  /**
   * The Redux store state specific to the current test scenario.
   *
   * This is set by the `.withReduxState()` method and cleared after `.mount()` is called.
   */
  protected scenarioReduxState: DeepPartial<S> = {};

  /**
   * The Redux store instance.
   *
   * This is set during the `.beforeMount()` hook.
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
    return merge(this.defaultReduxState, this.scenarioReduxState) as S;
  }

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
   * Mounts the component using Enzyme's `mount()` function.
   *
   * Returns the `ReactWrapper` instance from `mount()`.
   */
  // @ts-ignore
  public mount = () => {
    this.dispatchedActions = [];
    this.beforeMount();

    const props = this.defineProps() as P;
    // @ts-ignore
    const wrapper: TWrapperWithStore<P, S> = mount<P>(
      <this.Component {...props} />,
      {
        wrappingComponent: this.WrappingComponent,
      }
    );

    this.reset();

    wrapper.store = this.reduxStore!;

    return wrapper;
  };

  /**
   * This method isn't supported when mounting components that read from Redux - use `.mount()` instead
   */
  public render = () => {
    this.beforeMount();
    this.reset();

    throw new Error(
      "The 'render' method is not supported when mounting a connected component. Use 'mount' instead and call .render() on the returned wrapper."
    );
  };

  /**
   * This method isn't supported when mounting components that read from Redux - use `.mount()` instead
   */
  public shallow = () => {
    this.beforeMount();
    this.reset();

    throw new Error(
      "The 'shallow' method is not supported when mounting a connected component. Use 'mount' instead."
    );
  };

  /**
   * Resets the Redux action history
   */
  public resetReduxHistory = () => {
    this.dispatchedActions = [];
  };

  /**
   * The beforeMount hook.
   *
   * This sets the instance of the Redux store used by the current test scenario.
   */
  protected beforeMount = () => {
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
  protected WrappingComponent: React.FC = ({ children }) => (
    <Provider store={this.reduxStore!}>{children}</Provider>
  );

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
    middlewares: Middleware[]
  ): Store;
}
