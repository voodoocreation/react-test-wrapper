import * as React from "react";
import { IntlConfig } from "react-intl";

import { WrapperWithIntl } from "../../src/react-testing-library/WrapperWithIntl.js";

export const messages = {
  BUTTON: "Button",
};

export class Wrapper<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>,
> extends WrapperWithIntl<C, P> {
  protected intlProviderProps: Partial<IntlConfig> = {
    messages,
  };
}
