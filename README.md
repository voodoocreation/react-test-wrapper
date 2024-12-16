React Test Wrapper
==================

The intention of this package is to provide a simple, clean way of setting up your React components
for unit tests, to reduce test setup boilerplate code, whilst automatically inferring your component
TypeScript definitions (props, instance methods etc) to avoid needing to manually import types and
retype definitions in your tests and also providing better inline IDE autocomplete/validation support.

The classes provided are also able to be extended to add to the API that's available, if your
project requires additional functionality as part of your component test setup.

The concept behind it is that you can create a single instance of the wrapper class at the top of
your test file and define the defaults to use there, then in each test scenario you can reference
the single instance and define the scenario-specific props/children etc. chaining the public methods,
then finally calling the `render` method to return the rendering result.

The scenario-specific definitions are reset each time you call `render`, which
will ensure it reverts back to only the defaults set at the top and prevents scenario data from leaking
between tests.

## Example
```typescript jsx
import { screen, Wrapper } from "react-test-wrapper";

const component = new Wrapper(SomeComponent)
  .withDefaultChildren(<div className="Child" />)
  .withDefaultProps({
    prop1: "Default value 1",
    prop2: "Default value 2"
  });

describe("when testing a scenario", () => {
  let result: ReturnType<typeof component.render>;

  it("renders the component", () => {
    result = component
      .withProps({
        prop1: "Scenario value 1"
      })
      .render();
  });

  it("uses the scenario-specific value for prop1", () => {
    expect(screen.getByText("Scenario value 1")).toBeDefined();
  });

  it("uses the default value for prop2", () => {
    expect(screen.getByText("Default value 2")).toBeDefined();
  });

  it("updates the props", () => {
    result.updateProps({
      prop1: "New scenario value 1"
    });
  });

  it("renders the new prop value", () => {
    expect(screen.getByText("New scenario value 1")).toBeDefined();
  });
});
```

Package contents
----------------
- [`Wrapper`](/docs/react-testing-library/Wrapper.md)
- [`WrapperWithIntl`](/docs/react-testing-library/WrapperWithIntl.md)
- [`WrapperWithRedux`](/docs/react-testing-library/WrapperWithRedux.md)
- [Custom `react-testing-library` queries](/docs/react-testing-library/queries.md)
