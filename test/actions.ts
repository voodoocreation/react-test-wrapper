import { createAction } from "@reduxjs/toolkit";

const PREFIX = "TEST";

export const setValue = createAction<string>(`${PREFIX}/SET_VALUE`);
