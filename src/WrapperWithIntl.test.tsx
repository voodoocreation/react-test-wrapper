import * as React from "react";
import { IntlConfig } from "react-intl";

import { IntlDummy } from "../test/IntlDummy";
import WrapperWithIntl from "./WrapperWithIntl";

const messages = {
  BUTTON: "Button"
};

class Wrapper<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> extends WrapperWithIntl<C, P> {
  protected intlProviderProps: Partial<IntlConfig> = {
    messages
  };
}

describe("WrapperWithIntl", () => {
  const component = new Wrapper(IntlDummy).withDefaultProps({
    value: "Default value"
  });

  describe("when using the 'shallow' method", () => {
    const wrapper = component.shallow();

    it("renders the correct BUTTON message", () => {
      expect(
        wrapper
          .render()
          .find(".Dummy--button")
          .text()
      ).toBe(messages.BUTTON);
    });
  });

  describe("when using the 'mount' method", () => {
    const wrapper = component.mount();

    it("renders the correct BUTTON message", () => {
      expect(wrapper.find(".Dummy--button").text()).toBe(messages.BUTTON);
    });
  });

  describe("when using the 'render' method", () => {
    const wrapper = component.render();

    it("renders the correct BUTTON message", () => {
      expect(wrapper.find(".Dummy--button").text()).toBe(messages.BUTTON);
    });
  });
});
