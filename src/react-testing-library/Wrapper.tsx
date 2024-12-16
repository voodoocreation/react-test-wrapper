import {
  cleanup,
  render,
  queries as defaultQueries,
  RenderResult,
} from "@testing-library/react";
import * as React from "react";

import { queries as customQueries } from "./queries.js";

const queries = {
  ...defaultQueries,
  ...customQueries,
};

export type TRenderResult<P> = RenderResult<typeof queries> & {
  updateProps: (newProps: Partial<P>) => void;
};

/**
 * A class to provide a simple interface for setting up your React component unit tests
 */
export class Wrapper<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>,
> {
  // region Properties that are implemented in classes that extend Wrapper

  /**
   * The component that will wrap the component you're testing.
   *
   * This is useful adding provider components to wrap your components with.
   */
  protected WrappingComponent: React.ComponentType<any> | undefined = undefined;

  // endregion

  // region Properties that remain throughout instance lifecycle

  /**
   * The default children for all test scenarios for the current test suite.
   *
   * This is set by the `.withDefaultChildren()` method.
   */
  protected defaultChildren: React.ReactNode;

  /**
   * The default props for all test scenarios for the current test suite.
   *
   * This is set by the `.withDefaultProps()` method.
   */
  protected defaultProps: Partial<P> = {};

  // endregion

  // region Scenario-specific properties that are cleared whenever shallow/mount/render are called

  /**
   * The children specific to the test scenario.
   *
   * This is set by the `.withChildren()` method and cleared after `.mount()`, `.render()` or `.shallow()` are called.
   */
  protected scenarioChildren: React.ReactNode;

  /**
   * The props specific to the test scenario.
   *
   * This is set by the `.withProps()` method and cleared after `.mount()`, `.render()` or `.shallow()` are called.
   */
  protected scenarioProps: Partial<P> = {};

  // endregion

  // region Properties to be accessed via getters after mounting

  /**
   * The merged props to be used during the lifecycle of the test scenario.
   *
   * This is set by the `.mount()`, `.render()` and `.shallow()` methods so that you can access the
   * props in your test via the `.props` getter.
   */
  protected mergedProps: Partial<P> = {};

  // endregion

  /**
   * @param Component The React component to test
   */
  constructor(protected readonly Component: C) {}

  /**
   * Returns the props for the current test scenario lifecycle
   */
  public get props() {
    return this.mergedProps;
  }

  /**
   * Sets the default children to be used in all test scenarios for the current test suite.
   *
   * This method can be chained with other methods.
   *
   * @param children  The children to set
   */
  public withDefaultChildren = (children: React.ReactNode) => {
    this.defaultChildren = children;

    return this;
  };

  /**
   * Sets the default props to be used in all test scenarios for the current test suite.
   *
   * This method can be chained with other methods.
   *
   * @param props The props to set
   */
  public withDefaultProps = (props: Partial<P>) => {
    this.defaultProps = props;

    return this;
  };

  /**
   * Sets the children to be used by the current test scenario.
   *
   * This method can be chained with other methods.
   *
   * @param children  The children to set
   */
  public withChildren = (children: React.ReactNode) => {
    this.scenarioChildren = children;

    return this;
  };

  /**
   * Sets the props to be used by the current test scenario.
   *
   * This method can be chained with other methods.
   *
   * @param props The props to set
   */
  public withProps = (props: Partial<P>) => {
    this.scenarioProps = props;

    return this;
  };

  /**
   * Renders the component using the `render` function from `react-testing-library`.
   *
   * Returns the `RenderResult` from `render()`.
   */
  public render = (): TRenderResult<P> => {
    this.beforeRender();

    const props = this.defineProps() as P;
    const result = render<typeof queries>(<this.Component {...props} />, {
      queries,
      wrapper: this.WrappingComponent,
    });

    this.reset();

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
   * This is called before `.render()` is called.
   *
   * You can use this to perform additional functionality when extending this class.
   */
  protected beforeRender = () => {
    // Implement this method when extending to define properties to pass to `WrappingComponent`
    cleanup();
  };

  /**
   * Defines the merged props for the current test scenario lifecycle
   */
  protected defineProps = () => {
    this.mergedProps = {
      ...this.defaultProps,
      ...this.scenarioProps,
      children: this.scenarioChildren || this.defaultChildren,
    };

    return this.mergedProps;
  };

  /**
   * Resets the scenario-specific children and props for the instance
   */
  // eslint-disable-next-line
  protected reset() {
    this.scenarioChildren = undefined;
    this.scenarioProps = {};
  }
}
