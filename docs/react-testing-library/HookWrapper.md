`HookWrapper`
=============

This abstract class has a `wrapper` property defined which wraps the component in a Redux `Provider`,
passing in the return value from the `createStore` method.

To use this class, you have to extend it and set the `wrapper` property to an instance of your application's
pre-configured `Wrapper` class. This is to keep things scalable and able to support any type of `Wrapper`
being used.


How to extend
-------------

To extend this class to implement your own setup functionality, you can do so as shown in the
example below.

```typescript jsx
import { THook, HookWrapper as BaseHookWrapper } from "react-test-wrapper";

// This must be your pre-configured `Wrapper` class, to ensure that all of the methods and types are present.
import { Wrapper } from "./Wrapper.js";

export class HookWrapper<
  H extends THook,
  W extends Wrapper<React.ComponentType<any>>,
> extends BaseHookWrapper<H, W> {
  constructor(hook: H) {
    super(hook);

    this.wrapper = new Wrapper(this.WrappingComponent) as W;
  }
}
```


How to use it in your tests
---------------------------

```typescript jsx
const hook = new HookWrapper(useMyStuff);

hook.wrapper.withDefaultReduxState({
  test: {
    valueA: "Default value A",
    valueB: "Default value B",
  },
});

describe("useMyStuff", () => {
  describe("when using scenario-specific state", () => {
    it("mounts the hook", () => {
      hook.wrapper.withReduxState({
        test: {
          valueA: "Scenario value A",
        },
      });

      hook.mount("A", 2);
    });

    it("returns the expected value", () => {
      expect(hook.returnValue).toEqual({
        selectedValueA: "Scenario value A",
        selectedValueB: "Default value B",
        valueA: "A",
        valueB: 2,
      });
    });

    it("updates the parameters", () => {
      hook.update("B", 3);
    });

    it("updates the return value", () => {
      expect(hook.returnValue).toEqual({
        selectedValueA: "Scenario value A",
        selectedValueB: "Default value B",
        valueA: "B",
        valueB: 3,
      });
    });
  });
});
```
