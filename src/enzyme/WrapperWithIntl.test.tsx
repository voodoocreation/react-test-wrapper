import Wrapper, { messages } from "../../test/enzyme/TestWrapperWithIntl";
import { IntlDummy } from "../../test/IntlDummy";

describe("WrapperWithIntl", () => {
  const component = new Wrapper(IntlDummy).withDefaultProps({
    value: "Default value",
  });

  describe("when using the 'shallow' method", () => {
    const wrapper = component.shallow();

    it("renders the correct BUTTON message", () => {
      expect(wrapper.render().find(".Dummy--button").text()).toBe(
        messages.BUTTON
      );
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
