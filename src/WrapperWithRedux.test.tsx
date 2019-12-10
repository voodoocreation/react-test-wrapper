import { ReactWrapper } from "enzyme";
import * as React from "react";
import { DeepPartial, Middleware } from "redux";

import * as actions from "../test/actions";
import { ConnectedDummy } from "../test/Dummy";
import { createStore, TStoreState } from "../test/store";
import WrapperWithRedux from "./WrapperWithRedux";

class Wrapper<
  C extends React.ComponentType<any>,
  S extends {} = TStoreState
> extends WrapperWithRedux<C, S> {
  protected createStore(
    initialState: DeepPartial<S>,
    middlewares: Middleware[]
  ) {
    return createStore(initialState, middlewares);
  }
}

describe("WrapperWithRedux", () => {
  describe("when using the different render methods", () => {
    const component = new Wrapper(ConnectedDummy).withDefaultReduxState({
      test: {
        value: "Default value"
      }
    });

    describe("when using 'shallow'", () => {
      it("throws an error", () => {
        expect(() => component.shallow()).toThrowError();
      });
    });

    describe("when using 'mount'", () => {
      const { wrapper } = component.mount();

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
    const component = new Wrapper(ConnectedDummy).withDefaultReduxState({
      test: {
        value: "Default value"
      }
    });

    it("mounts with default reduxState correctly", () => {
      const { wrapper } = component.mount();

      expect(wrapper.find(".Dummy--value").text()).toBe("Default value");
    });

    it("mounts with test-specific reduxState correctly", () => {
      const { wrapper } = component
        .withReduxState({
          test: {
            value: "Test value"
          }
        })
        .mount();

      expect(wrapper.find(".Dummy--value").text()).toBe("Test value");
    });

    it("clears test-specific reduxState after previous test and uses default reduxState again", () => {
      const { wrapper } = component.mount();

      expect(wrapper.find(".Dummy--value").text()).toBe("Default value");
    });
  });

  describe("when using the reduxHistory API", () => {
    const component = new Wrapper(ConnectedDummy);
    const { wrapper } = component.mount();

    it("starts with an empty history", () => {
      expect(component.reduxHistory).toEqual([]);
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
  });

  describe("when accessing the store", () => {
    let result: any;
    const payload = "Dispatched value";
    const state = {
      test: {
        value: "Default value"
      }
    };
    const component = new Wrapper(ConnectedDummy).withDefaultReduxState(state);

    it("doesn't have the store defined before mounting", () => {
      expect(component.store).toBeUndefined();
    });

    it("mounts the component", () => {
      result = component.mount();
    });

    it("has the store defined after mounting", () => {
      expect(component.store).toBeDefined();
    });

    it("has the expected state in the store", () => {
      expect(component.store?.getState()).toEqual(state);
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
      expect(
        result.wrapper
          .update()
          .find(".Dummy--value")
          .text()
      ).toBe(payload);
    });
  });
});
