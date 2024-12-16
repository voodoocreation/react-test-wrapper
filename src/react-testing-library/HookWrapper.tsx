import { act } from "@testing-library/react";
import * as React from "react";

import { Wrapper } from "./Wrapper.js";

export type THook = (...values: any[]) => any;

/**
 * A class to provide a simple method of setting up your React hook tests.
 */
export abstract class HookWrapper<
  H extends THook,
  W extends Wrapper<React.ComponentType<any>>,
  P extends Parameters<H> = Parameters<H>,
> {
  /**
   * The instance of the `Wrapper` used to mount the hook.
   */
  public wrapper: W;

  /**
   * The return value of the hook.
   */
  public returnValue?: ReturnType<H>;

  /**
   * The params that were passed to the hook.
   */
  protected params: P = [] as any;

  /**
   * @param hook  The hook you want to test
   */
  protected constructor(protected readonly hook: H) {
    this.wrapper = new Wrapper(this.WrappingComponent) as W;
  }

  /**
   * Update the values provided to the hook.
   */
  /* istanbul ignore next */
  public update: (...args: P) => void = () => {};

  /**
   * Mount the hook with the provided values.
   *
   * @param args  The values to provide to the hook
   */
  public mount = (...args: P) => {
    this.params = args;
    this.wrapper!.render();
  };

  /**
   * The React component that wraps the usage of the hook and updates the `returnValue` property and `update` method.
   */
  protected WrappingComponent: React.ComponentType<any> = () => {
    const [values, setValues] = React.useState(this.params);

    this.update = (...args: P) => {
      act(() => {
        setValues(args);
      });
    };

    this.returnValue = this.hook(...values);

    return null;
  };
}
