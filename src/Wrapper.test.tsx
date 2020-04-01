import { ReactWrapper, ShallowWrapper } from "enzyme";
import * as React from "react";

import { Dummy } from "../test/Dummy";
import Wrapper from "./Wrapper";

describe("Wrapper", () => {
  describe("when using the different render methods", () => {
    const component = new Wrapper(Dummy).withDefaultProps({
      value: "Default value",
    });

    describe("when using 'shallow'", () => {
      const wrapper = component.shallow();

      it("returns ShallowWrapper", () => {
        expect(wrapper).toBeInstanceOf(ShallowWrapper);
      });

      it("has the correct root node", () => {
        expect(wrapper.instance()).toBeInstanceOf(Dummy);
      });

      it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("when using 'mount'", () => {
      const wrapper = component.mount();

      it("returns ReactWrapper", () => {
        expect(wrapper).toBeInstanceOf(ReactWrapper);
      });

      it("has the correct root node", () => {
        expect(wrapper.instance()).toBeInstanceOf(Dummy);
      });

      it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("when using 'render'", () => {
      const wrapper = component.render();

      it("returns Cheerio wrapper", () => {
        expect(wrapper.cheerio).toBe("[cheerio object]");
      });

      it("has the correct root node", () => {
        expect(wrapper.hasClass("Dummy")).toBe(true);
      });

      it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe("when using the children API", () => {
    const component = new Wrapper(Dummy).withDefaultChildren(
      <div>Default children</div>
    );

    it("renders default children correctly", () => {
      const wrapper = component.render();

      expect(wrapper.find(".Dummy--children").html()).toBe(
        "<div>Default children</div>"
      );
    });

    it("renders test-specific children correctly", () => {
      const wrapper = component
        .withChildren(<span>Test children</span>)
        .render();

      expect(wrapper.find(".Dummy--children").html()).toBe(
        "<span>Test children</span>"
      );
    });

    it("clears test-specific children after previous test and renders default children again", () => {
      const wrapper = component.render();

      expect(wrapper.find(".Dummy--children").html()).toBe(
        "<div>Default children</div>"
      );
    });
  });

  describe("when using the props API", () => {
    const component = new Wrapper(Dummy).withDefaultProps({
      value: "Default value",
    });

    it("renders with default props correctly", () => {
      const wrapper = component.render();

      expect(component.props).toEqual({ value: "Default value" });
      expect(wrapper.find(".Dummy--value").text()).toBe("Default value");
    });

    it("renders with test-specific props correctly", () => {
      const wrapper = component
        .withProps({
          value: "Test value",
        })
        .render();

      expect(component.props).toEqual({ value: "Test value" });
      expect(wrapper.find(".Dummy--value").text()).toBe("Test value");
    });

    it("clears test-specific props after previous test and uses default props again", () => {
      const wrapper = component.render();

      expect(component.props).toEqual({ value: "Default value" });
      expect(wrapper.find(".Dummy--value").text()).toBe("Default value");
    });
  });
});
