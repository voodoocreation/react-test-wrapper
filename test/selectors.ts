import { TStoreState } from "./store";

export const getValue = (store: TStoreState) => store.test.value;
