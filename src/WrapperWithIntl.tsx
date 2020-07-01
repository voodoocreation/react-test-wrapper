import * as React from "react";
import { IntlConfig, IntlProvider } from "react-intl";

import Wrapper from "./Wrapper";

/**
 * A class to provide a simple interface for setting up your React component unit tests, with support for `react-intl`.
 *
 * This class shouldn't be used when using `react-intl-redux`, as that uses a different provider component.
 */
export default abstract class WrapperWithIntl<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends Wrapper<C, P> {
  /**
   * The props to be passed to `react-intl`'s `IntlProvider` component
   */
  protected abstract intlProviderProps: Partial<IntlConfig>;

  /**
   * Returns the merged `IntlProvider` props
   */
  protected get mergedIntlProviderProps() {
    return {
      defaultLocale: "en",
      locale: navigator.language,
      messages: {},
      ...this.intlProviderProps,
    };
  }

  /**
   * The component that wraps the component you're testing
   */
  protected WrappingComponent: React.FC = ({ children }) => (
    <IntlProvider {...this.mergedIntlProviderProps}>{children}</IntlProvider>
  );
}
