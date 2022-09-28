import { TStoreState } from "./store";

export const getValue = (store: TStoreState) => store.test.value;

export const getArray = (store: TStoreState) => store.test.array;
