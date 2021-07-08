import {
  screen as baseScreen,
  queries as baseQueries,
  Screen,
} from "@testing-library/react";

import * as customQueries from "./queries";

const queries = {
  ...baseQueries,
  ...customQueries,
};

const screen: Screen<typeof queries> = baseScreen as any;

for (const [name, fn] of Object.entries(queries)) {
  // @ts-ignore
  screen[name] = fn.bind(null, document.body);
}

export default screen;
