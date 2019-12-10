import actionCreatorFactory from "typescript-fsa";

const createAction = actionCreatorFactory("TEST");

export const setValue = createAction<string>("SET_VALUE");
