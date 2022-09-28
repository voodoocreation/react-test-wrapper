import { fireEvent } from "@testing-library/react";

import * as actions from "../../test/actions";
import Wrapper from "../../test/react-testing-library/TestWrapperWithRedux";
import { ReduxDummy } from "../../test/ReduxDummy";

const initialState = {
  test: {
    array: ["item-a"],
    value: "Default value",
  },
};

const component = new Wrapper(ReduxDummy).withDefaultReduxState(initialState);

describe("WrapperWithRedux", () => {
  describe("when using the reduxState API", () => {
    it("mounts with default reduxState correctly", () => {
      const { getByText, getByClassName } = component.render();

      expect(getByClassName("Dummy")).toBeDefined();
      expect(getByText("Default value")).toBeDefined();
    });

    it("mounts with test-specific reduxState correctly", () => {
      const { getByText } = component
        .withReduxState({
          test: {
            value: "Test value",
          },
        })
        .render();

      expect(getByText("Test value")).toBeDefined();
    });

    it("doesn't merge arrays when withMergedReduxArrays(false) is used", () => {
      const { getByText, queryByText, queryAllByRole } = component
        .withMergedReduxArrays(false)
        .withReduxState({
          test: {
            array: ["item-b"],
          },
        })
        .render();

      expect(queryAllByRole("listitem")).toHaveLength(1);
      expect(getByText("item-b")).toBeDefined();
      expect(queryByText("item-a")).toBeNull();
    });

    it("clears test-specific reduxState after previous test and uses default reduxState again", () => {
      const { getByText } = component.render();

      expect(getByText("Default value")).toBeDefined();
    });
  });

  describe("when using the reduxHistory API", () => {
    const { getByText } = component.render();

    it("starts with an empty history", () => {
      expect(component.reduxHistory).toEqual([]);
    });

    it("renders the correct value", () => {
      expect(getByText("Default value")).toBeDefined();
    });
    it("clicks the button", () => {
      fireEvent.click(getByText("Button"));
    });

    it("dispatches actions.setValue with expected payload", () => {
      const matchingActions = component.reduxHistory.filter(
        actions.setValue.match
      );

      expect(matchingActions).toHaveLength(1);
      expect(matchingActions[0].payload).toBe("Click");
    });

    it("renders the correct value", () => {
      expect(getByText("Click")).toBeDefined();
    });

    it("clicks the button again", () => {
      fireEvent.click(getByText("Button"));
    });

    it("dispatches actions.setValue again with expected payload", () => {
      const matchingActions = component.reduxHistory.filter(
        actions.setValue.match
      );

      expect(matchingActions).toHaveLength(2);
      expect(matchingActions[1].payload).toBe("Click");
    });

    it("renders the component again", () => {
      component.render();
    });

    it("resets reduxHistory", () => {
      expect(component.reduxHistory).toEqual([]);
    });

    it("clicks the button again", () => {
      fireEvent.click(getByText("Button"));
    });

    it("dispatches actions.setValue again with expected payload", () => {
      const matchingActions = component.reduxHistory.filter(
        actions.setValue.match
      );

      expect(matchingActions).toHaveLength(1);
      expect(matchingActions[0].payload).toBe("Click");
    });

    it("calls the resetReduxHistory method", () => {
      component.resetReduxHistory();
    });

    it("resets reduxHistory", () => {
      expect(component.reduxHistory).toEqual([]);
    });
  });

  describe("when accessing the store", () => {
    const payload = "Dispatched value";
    let result: ReturnType<typeof component.render>;

    it("renders the component", () => {
      result = component.render();
    });

    it("has the expected state in the store", () => {
      expect(result.store.getState()).toEqual(initialState);
    });

    it("renders the default value", () => {
      expect(result.getByText(initialState.test.value)).toBeDefined();
    });

    it("dispatches an action", async () => {
      result.store.dispatch(actions.setValue(payload));
    });

    it("has the action in the history", () => {
      expect(
        component.reduxHistory.filter(actions.setValue.match)
      ).toHaveLength(1);
    });

    it("updates the store", () => {
      expect(result.store.getState()).toEqual({
        test: {
          array: initialState.test.array,
          value: payload,
        },
      });
    });

    it("renders the new value", () => {
      expect(result.getByText(payload)).toBeDefined();
    });
  });
});
