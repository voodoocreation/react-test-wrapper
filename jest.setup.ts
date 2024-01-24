import "@testing-library/react/dont-cleanup-after-each";

import { configure } from "@testing-library/react";

configure({
  testIdAttribute: "data-automationid",
});
