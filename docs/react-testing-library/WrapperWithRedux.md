`WrapperWithRedux`
=================

This abstract class has a `WrappingComponent` defined which wraps the component in a Redux `Provider`,
passing in the return value from the `createStore` method.

To use this class, you have to extend it, pass in your store state type in the class declaration and
define your own `createStore` method to return an instance of your Redux store, using the
`initialState` and `middlewares` that this class provides - it is important to ensure that your
store uses these, because if it disregards them, none of the methods this class provides will function.


For example:
```typescript jsx
const component = new WrapperWithRedux(SomeComponent);

describe("when testing a scenario", () => {
  const wrapper = component
    .withReduxState({
      test: {
        value: "Scenario value 1"
      }
    })
    .render();

  it("renders the initial value", () => {
    expect(wrapper.find(".SomeComponent--value").text()).toBe("Initial value");
  });

  it("dispatches actions.setValue", () => {
    wrapper.store.dispatch(actions.setValue("New value"));
  });

  it("renders the updated value", () => {
    expect(wrapper.find(".SomeComponent--value").text()).toBe("New value");
  });
});
```


Public read-only properties
---------------------------

### `reduxHistory`
An array of actions that have been dispatched, used when asserting that actions have been
dispatched as expected during interactions or in the component lifecycle.


Public methods
--------------

In addition to the public methods provided by the base [`Wrapper`](Wrapper.md) class, the following
methods are available.

### `withDefaultReduxState`
Sets the default Redux store state to be used for the wrapper instance.

### `withReduxState`
Sets the scenario-specific Redux store state to be used - cleared after `render` is called.

### `withMergedReduxArrays`
Toggles whether arrays get merged or not in Redux state.

### `render`
Mounts the component with the React Testing Library `render` function, using the currently-set data.
Returns a `RenderResult` instance, which also includes a `store` property.


How to extend for use in your project
-------------------------------------

```typescript jsx
import * as React from "react";
import { WrapperWithRedux as BaseWrapper } from "react-test-wrapper";

import { createStore, TStoreState } from "../store";

class Wrapper<
  C extends React.ComponentType<any>,
  S extends {} = TStoreState,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends BaseWrapper<C, S, P> {
  protected createStore(
    initialState: DeepPartial<S>,
    middlewares: Middleware[]
  ) {
    return createStore(initialState, middlewares);
  }
}
```
