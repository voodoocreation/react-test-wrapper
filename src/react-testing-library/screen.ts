import {
  screen as baseScreen,
  queries as baseQueries,
  Screen,
} from "@testing-library/react";

import { queries as customQueries } from "./queries.js";

const queries = {
  ...baseQueries,
  ...customQueries,
};

const screen: Screen<typeof queries> = baseScreen as any;

for (const [name, fn] of Object.entries(queries)) {
  // @ts-ignore
  screen[name] = fn.bind(null, document.body);
}

export { screen };
