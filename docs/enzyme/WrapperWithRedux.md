`WrapperWithRedux`
=================

This abstract class has a `WrappingComponent` defined which wraps the component in a Redux `Provider`,
passing in the return value from the `createStore` method.

To use this class, you have to extend it, pass in your store state type in the class declaration and
define your own `createStore` method to return an instance of your Redux store, using the
`initialState` and `middlewares` that this class provides - it is important to ensure that your
store uses these, because if it disregards them, none of the methods this class provides will function.

Extensions to the returned `ReduxWrapper`
-----------------------------------------

The return type of the `mount` method extends Enzyme's `ReactWrapper` by adding a store property to
it, so you can access the store instance that the component was mounted with. This is useful for
some edge cases where you may want to test how your component reacts to actions being dispatched
outside of the component's scope.

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
    .mount();

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

Note:
While technically the `render` and `shallow` methods are accessible, they will throw an error
due to issues with the integration of the Redux store provider.

`render` doesn't work due to its use of `useLayout`, which doesn't work in a test environment.
`shallow` isn't useful due to it only mounting the Redux provider component.

### `withDefaultReduxState`
Sets the default Redux store state to be used for the wrapper instance.

### `withReduxState`
Sets the scenario-specific Redux store state to be used - cleared after `mount`, `render` or `shallow` are called.

### `withMergedReduxArrays`
Toggles whether arrays get merged or not in Redux state.

### `mount`
Mounts the component with the Enzyme `mount` function, using the currently-set data.
Returns a `ReactWrapper` instance, which also includes a `store` property.


How to extend for use in your project
-------------------------------------

```typescript jsx
import * as React from "react";
import { WrapperWithRedux as BaseWrapper } from "react-test-wrapper/enzyme";

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
