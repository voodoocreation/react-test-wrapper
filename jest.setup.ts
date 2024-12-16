import "@testing-library/react/dont-cleanup-after-each";
import "@testing-library/jest-dom/jest-globals";
import { configure } from "@testing-library/react";

configure({
  testIdAttribute: "data-automationid",
});
