import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "./actions";
import * as selectors from "./selectors";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ReduxDummy = ({ children }: IProps) => {
  const dispatch = useDispatch();

  const value = useSelector(selectors.getValue);
  const array = useSelector(selectors.getArray);

  const onClick = React.useCallback(() => {
    dispatch(actions.setValue("Click"));
  }, []);

  return (
    <div className="Dummy">
      <div className="Dummy--value">{value}</div>
      <ul className="Dummy--array">
        {array.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="Dummy--children">{children}</div>
      <button className="Dummy--button" type="button" onClick={onClick}>
        Button
      </button>
    </div>
  );
};
