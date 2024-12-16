import { useSelector } from "react-redux";

import { getValue } from "./selectors.js";

export const useTestHook = (valueA: string, valueB: number) => {
  const selectedValue = useSelector(getValue);

  return {
    selectedValue,
    valueA,
    valueB,
  };
};
