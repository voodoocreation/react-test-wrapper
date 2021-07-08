import "@testing-library/react/dont-cleanup-after-each";

import { configure as configureRTL } from "@testing-library/react";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure as configureEnzyme } from "enzyme";

configureEnzyme({ adapter: new EnzymeAdapter() });

configureRTL({
  testIdAttribute: "data-automationid",
});
