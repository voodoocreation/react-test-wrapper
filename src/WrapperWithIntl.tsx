import * as React from "react";
import { IntlConfig, IntlProvider } from "react-intl";

import Wrapper from "./Wrapper";

export default abstract class WrapperWithIntl<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends Wrapper<C, P> {
  protected abstract intlProviderProps: Partial<IntlConfig>;

  protected get mergedIntlProviderProps() {
    return {
      defaultLocale: "en",
      locale: navigator.language,
      messages: {},
      ...this.intlProviderProps
    };
  }

  protected WrappingComponent: React.FC = ({ children }) => (
    <IntlProvider {...this.mergedIntlProviderProps}>{children}</IntlProvider>
  );
}
