`Wrapper`
=========

This is the base class which is used for basic presentational components. The other classes provided
extend this one, so all methods defined on this class are also available on the others.

As with all of these classes, you can extend it to implement your own additional functionality.


Protected abstract methods to define when extending
---------------------------------------------------

### `beforeRender`
This method is called before `render` is called. The intention is to use this
when defining any instance properties that need to be passed as props in your `WrappingComponent`,
such as the Redux store instance (see [`WrapperWithRedux`](./WrapperWithRedux.md) for example).


Public read-only properties
---------------------------

### `props`
The props the component was mounted with. Useful for avoiding needing to declare local variables
for later assertion reference - especially mock function instances.


Public methods
--------------

### `withDefaultChildren`
Sets the default children to be used for the wrapper instance.

### `withDefaultProps`
Sets the default props to be used for the wrapper instance.

### `withChildren`
Sets the scenario-specific children to be used - cleared afte `render` is called.

### `withProps`
Sets the scenario-specific props to be used - cleared after `render` is called.

### `render`
Mounts the component with the `react-testing-library` `render` function, using the currently-set data.
Returns the `RenderResult` returned by the `render` function.

In addition to the `RenderResult` values, an `updateProps` function is also returned, which wraps
a call to the RTL `rerender` method in an `act`, as a convenience method to update props within the
component lifecycle.


How to extend
-------------

To extend this class to implement your own setup functionality, you can do so as shown in the
example below.

There's a `WrappingComponent` property on the `Wrapper` class that will automatically be used by
`render` when it's defined, to wrap the component being tested.
This is very useful when testing components that require some form of context provider component to
exist in the React tree.

```typescript jsx
import * as React from "react";
import { Wrapper as BaseWrapper } from "react-test-wrapper";

export class WrapperWithCustomStuff<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends BaseWrapper<C, P> {
  protected WrappingComponent: React.FC = ({ children }) => (
    <SomeProviderComponent>
      {children}
    </SomeProviderComponent>
  );

  // Add custom properties and methods here
}
```
