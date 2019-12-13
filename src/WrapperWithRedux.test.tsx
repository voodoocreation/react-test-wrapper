import { ReactWrapper } from "enzyme";

import * as actions from "../test/actions";
import { ConnectedDummy } from "../test/Dummy";
import Wrapper from "../test/TestWrapperWithRedux";

const initialState = {
  test: {
    value: "Default value"
  }
};

const component = new Wrapper(ConnectedDummy).withDefaultReduxState(
  initialState
);

describe("WrapperWithRedux", () => {
  describe("when using the different render methods", () => {
    describe("when using 'shallow'", () => {
      it("throws an error", () => {
        expect(() => component.shallow()).toThrowError();
      });
    });

    describe("when using 'mount'", () => {
      const wrapper = component.mount();

      it("returns ReactWrapper", () => {
        expect(wrapper).toBeInstanceOf(ReactWrapper);
      });

      it("has the component in the tree", () => {
        expect(wrapper.find(ConnectedDummy)).toHaveLength(1);
      });

      it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("when using 'render'", () => {
      it("throws an error", () => {
        expect(() => component.render()).toThrowError();
      });
    });
  });

  describe("when using the reduxState API", () => {
    it("mounts with default reduxState correctly", () => {
      const wrapper = component.mount();

      expect(wrapper.find(".Dummy--value").text()).toBe("Default value");
    });

    it("mounts with test-specific reduxState correctly", () => {
      const wrapper = component
        .withReduxState({
          test: {
            value: "Test value"
          }
        })
        .mount();

      expect(wrapper.find(".Dummy--value").text()).toBe("Test value");
    });

    it("clears test-specific reduxState after previous test and uses default reduxState again", () => {
      const wrapper = component.mount();

      expect(wrapper.find(".Dummy--value").text()).toBe("Default value");
    });
  });

  describe("when using the reduxHistory API", () => {
    const wrapper = component.mount();

    it("starts with an empty history", () => {
      expect(component.reduxHistory).toEqual([]);
    });

    it("renders the correct value", () => {
      expect(wrapper.find(".Dummy--value").text()).toBe("Default value");
    });

    it("clicks the button", () => {
      wrapper.find(".Dummy--button").simulate("click");
    });

    it("dispatches actions.setValue with expected payload", () => {
      const matchingActions = component.reduxHistory.filter(
        actions.setValue.match
      );

      expect(matchingActions).toHaveLength(1);
      expect(matchingActions[0].payload).toBe("Click");
    });

    it("renders the correct value", () => {
      expect(wrapper.find(".Dummy--value").text()).toBe("Click");
    });

    it("clicks the button again", () => {
      wrapper.find(".Dummy--button").simulate("click");
    });

    it("dispatches actions.setValue again with expected payload", () => {
      const matchingActions = component.reduxHistory.filter(
        actions.setValue.match
      );

      expect(matchingActions).toHaveLength(2);
      expect(matchingActions[1].payload).toBe("Click");
    });

    it("mounts the component again", () => {
      component.mount();
    });

    it("resets reduxHistory", () => {
      expect(component.reduxHistory).toEqual([]);
    });

    it("clicks the button again", () => {
      wrapper.find(".Dummy--button").simulate("click");
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
    let wrapper: ReturnType<typeof component.mount>;
    const payload = "Dispatched value";

    it("mounts the component", () => {
      wrapper = component.mount();
    });

    it("has the expected state in the store", () => {
      expect(component.store?.getState()).toEqual(initialState);
    });

    it("renders the default value", () => {
      expect(wrapper.find(".Dummy--value").text()).toBe(
        initialState.test.value
      );
    });

    it("dispatches an action", () => {
      component.store?.dispatch(actions.setValue(payload));
    });

    it("has the action in the history", () => {
      expect(
        component.reduxHistory.filter(actions.setValue.match)
      ).toHaveLength(1);
    });

    it("updates the store", () => {
      expect(component.store?.getState()).toEqual({
        test: {
          value: payload
        }
      });
    });

    it("renders the new value", () => {
      expect(wrapper.find(".Dummy--value").text()).toBe(payload);
    });
  });
});
