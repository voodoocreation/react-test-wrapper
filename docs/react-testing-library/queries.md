Custom `react-testing-library` queries
======================================

Because this functionality is missing by default and is still useful, the following custom queries
are provided.

## Finding by `id`
- `getById`
- `getAllById`
- `findById`
- `findAllById`
- `queryById`
- `queryAllById`

## Finding by `className`
- `getByClassName`
- `getAllByClassName`
- `findByClassName`
- `findAllByClassName`
- `queryByClassName`
- `queryAllByClassName`

## Finding by CSS selector
- `getBySelector`
- `getAllBySelector`
- `findBySelector`
- `findAllBySelector`
- `queryBySelector`
- `queryAllBySelector`


## Usage
### Via the return value of `.render()`
The internals of all of the `Wrapper` classes integrate with the `render` function provided by
`react-testing-library` to include the custom queries to be returned along with everything else that's
usually returned there (such as their existing query functions).
```typescript
import { Wrapper } from "react-test-wrapper/react-testing-library";

const component = new Wrapper(SomeComponent);

describe("when testing a scenario", () => {
  const { getByClassName } = component.render();

  it("renders button A", () => {
    expect(getByClassName("SomeComponent--buttonA")).toBeDefined();
  });

  it("doesn't render button B", () => {
    expect(getByClassName("SomeComponent--buttonB")).toBeUndefined();
  });
});
```

### Via the custom `screen` provided by this package
If you want to use `screen`, just import the one from this package instead of their one.

```typescript
import { screen, Wrapper } from "react-test-wrapper/react-testing-library";

const component = new Wrapper(SomeComponent);

describe("when testing a scenario", () => {
  component.render();

  it("renders button A", () => {
    expect(screen.getByClassName("SomeComponent--buttonA")).toBeDefined();
  });

  it("doesn't render button B", () => {
    expect(screen.getByClassName("SomeComponent--buttonB")).toBeUndefined();
  });
});
```
