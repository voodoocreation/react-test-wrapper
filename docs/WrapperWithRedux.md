`WrapperWithRedux`
=================

This abstract class has a `WrappingComponent` defined which wraps the component in a Redux `Provider`,
passing in the return value from the `createStore` method.

To use this class, you have to extend it, pass in your store state type in the class declaration and
define your own `createStore` method to return an instance of your Redux store, using the
`initialState` and `middlewares` that this class provides - it is important to ensure that your
store uses these, because if it disregards them, none of the methods this class provides will function.


Public read-only properties
---------------------------

### `reduxHistory`
An array of actions that have been dispatched, used when asserting that actions have been
dispatched as expected during interactions or in the component lifecycle.

### `store`
The instance of the Redux store used. However, this is only available after calling `mount`.
If accessed prior to mounting your component, it will be `undefined`.


Public methods
--------------

In addition to the public methods provided by the base [`Wrapper`](./Wrapper.md) class, the following
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


How to extend for use in your project
-------------------------------------

```typescript jsx
import * as React from "react";
import { IntlConfig } from "react-intl";
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
