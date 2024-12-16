import * as React from "react";

import { screen } from "./screen.js";
import { Wrapper } from "./Wrapper.js";
import { Dummy } from "../../test/Dummy.js";

describe("Wrapper", () => {
  describe("when using the custom queries", () => {
    new Wrapper(Dummy)
      .withDefaultProps({
        value: "Default value",
      })
      .render();

    it("can use getByClassName", () => {
      expect(screen.getByClassName("Dummy--button")).toBeDefined();
    });

    it("can use getAllByClassName", () => {
      expect(screen.getAllByClassName("Dummy--button")).toHaveLength(1);
    });

    it("can use getById", () => {
      expect(screen.getById("Dummy--button")).toBeDefined();
    });

    it("can use getAllById", () => {
      expect(screen.getAllById("Dummy--button")).toHaveLength(1);
    });

    it("can use getAllBySelector", () => {
      expect(screen.getAllBySelector("button")).toHaveLength(1);
    });
  });

  describe("when using the children API", () => {
    const component = new Wrapper(Dummy).withDefaultChildren(
      <div>Default children</div>,
    );

    it("renders default children correctly", () => {
      const { getByText } = component.render();

      expect(getByText("Default children")).toBeDefined();
    });

    it("renders test-specific children correctly", () => {
      const { getByText } = component
        .withChildren(<span>Test children</span>)
        .render();

      expect(getByText("Test children")).toBeDefined();
    });

    it("clears test-specific children after previous test and renders default children again", () => {
      const { getByText } = component.render();

      expect(getByText("Default children")).toBeDefined();
    });
  });

  describe("when using the props API", () => {
    const component = new Wrapper(Dummy).withDefaultProps({
      value: "Default value",
    });

    it("renders with default props correctly", () => {
      const { getByText } = component.render();

      expect(component.props).toEqual({ value: "Default value" });
      expect(getByText("Default value")).toBeDefined();
    });

    it("renders with test-specific props correctly", () => {
      const { getByText, updateProps } = component
        .withProps({
          value: "Test value",
        })
        .render();

      expect(component.props).toEqual({ value: "Test value" });
      expect(getByText("Test value")).toBeDefined();

      updateProps({ value: "New test value" });
    });

    it("clears test-specific props after previous test and uses default props again", () => {
      const { getByText } = component.render();

      expect(component.props).toEqual({ value: "Default value" });
      expect(getByText("Default value")).toBeDefined();
    });
  });
});
