import { TestHookWrapper } from "../../test/react-testing-library/TestHookWrapper.js";
import { useTestHook } from "../../test/useTestHook.js";

const hook = new TestHookWrapper(useTestHook);

hook.wrapper.withDefaultReduxState({
  test: {
    value: "Redux value",
  },
});

describe("HookWrapper", () => {
  describe("when using default state", () => {
    it("mounts the hook", () => {
      hook.mount("A", 2);
    });

    it("returns the expected value", () => {
      expect(hook.returnValue).toEqual({
        selectedValue: "Redux value",
        valueA: "A",
        valueB: 2,
      });
    });

    it("updates the parameters", () => {
      hook.update("B", 3);
    });

    it("updates the return value", () => {
      expect(hook.returnValue).toEqual({
        selectedValue: "Redux value",
        valueA: "B",
        valueB: 3,
      });
    });
  });

  describe("when using scenario-specific state", () => {
    it("mounts the hook", () => {
      hook.wrapper.withReduxState({
        test: {
          value: "New redux value",
        },
      });

      hook.mount("A", 2);
    });

    it("returns the expected value", () => {
      expect(hook.returnValue).toEqual({
        selectedValue: "New redux value",
        valueA: "A",
        valueB: 2,
      });
    });

    it("updates the parameters", () => {
      hook.update("B", 3);
    });

    it("updates the return value", () => {
      expect(hook.returnValue).toEqual({
        selectedValue: "New redux value",
        valueA: "B",
        valueB: 3,
      });
    });
  });
});
