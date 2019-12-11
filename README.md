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
then finally calling the `mount`, `shallow` or `render` method to return the Enzyme wrapper and merged props.

The scenario-specific definitions are reset each time you call `mount`, `render` or `shallow`, which
will ensure it reverts back to only the defaults set at the top and prevents scenario data from leaking
between tests.

For example:
```typescript jsx
const component = new Wrapper(SomeComponent)
  .withDefaultChildren(<div className="Child" />)
  .withDefaultProps({
    prop1: "Default value 1",
    prop2: "Default value 2"
  });

describe("when testing a scenario", () => {
  const wrapper = component
    .withProps({
      prop1: "Scenario value 1"
    })
    .mount();

  it("uses the scenario-specific value for prop1", () => {
    expect(wrapper.find(".SomeComponent--prop1").text()).toBe("Scenario value 1");
  });

  it("uses the default value for prop2", () => {
    expect(wrapper.find(".SomeComponent--prop2").text()).toBe("Default value 1");
  });
});
```


The classes
-----------

- [`Wrapper`](./docs/Wrapper.md)
- [`WrapperWithIntl`](./docs/WrapperWithIntl.md)
- [`WrapperWithRedux`](./docs/WrapperWithRedux.md)
