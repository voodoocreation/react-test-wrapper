import * as React from "react";
import { FormattedMessage } from "react-intl";

interface IProps {
  children: React.ReactNode;
  onClick?: (value: string) => void;
  value: string;
}

export const IntlDummy = ({ children, value, ...props }: IProps) => {
  const onClick = React.useCallback(() => {
    if (props.onClick) {
      props.onClick(value);
    }
  }, []);

  return (
    <div className="Dummy">
      <div className="Dummy--value">{value}</div>
      <div className="Dummy--children">{children}</div>
      <button className="Dummy--button" type="button" onClick={onClick}>
        <FormattedMessage id="BUTTON" />
      </button>
    </div>
  );
};

IntlDummy.defaultProps = {
  onClick: undefined,
};
