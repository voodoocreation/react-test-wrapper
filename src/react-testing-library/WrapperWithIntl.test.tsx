import { IntlDummy } from "../../test/IntlDummy.js";
import {
  messages,
  Wrapper,
} from "../../test/react-testing-library/TestWrapperWithIntl.js";

describe("WrapperWithIntl", () => {
  const component = new Wrapper(IntlDummy).withDefaultProps({
    value: "Default value",
  });

  describe("when using the 'render' method", () => {
    const { getByText } = component.render();

    it("renders the correct BUTTON message", () => {
      expect(getByText(messages.BUTTON)).toBeDefined();
    });
  });
});
