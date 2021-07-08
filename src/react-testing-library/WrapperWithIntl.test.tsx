import { IntlDummy } from "../../test/IntlDummy";
import Wrapper, {
  messages,
} from "../../test/react-testing-library/TestWrapperWithIntl";

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
