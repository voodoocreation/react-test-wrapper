`WrapperWithIntl`
=================

This abstract class has a `WrappingComponent` defined which wraps the component in an `IntlProvider`,
passing in `intlProviderProps`.

To use this class, you have to extend it and define your own `intlProviderProps` to set your own
`messages` etc.


Public methods
--------------
The public methods are identical to the base [`Wrapper`](./Wrapper.md) class.


How to extend for use in your project
-------------------------------------

```typescript jsx
import * as React from "react";
import { IntlConfig } from "react-intl";
import { WrapperWithIntl as BaseWrapper } from "react-test-wrapper";

import messages from "./locales/en-NZ";

export class WrapperWithIntl<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends BaseWrapper<C, P> {
  protected intlProviderProps: Partial<IntlConfig> = {
    messages
  };
}
```
