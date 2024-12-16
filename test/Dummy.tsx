import * as React from "react";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: (value: string) => void;
  value: string;
}

export const Dummy = ({ children, value, ...props }: IProps) => {
  const onClick = React.useCallback(() => {
    if (props.onClick) {
      props.onClick(value);
    }
  }, []);

  return (
    <div className="Dummy">
      <div className="Dummy--value">{value}</div>
      <div className="Dummy--children">{children}</div>
      <button
        className="Dummy--button"
        id="Dummy--button"
        type="button"
        onClick={onClick}
      >
        Button
      </button>
    </div>
  );
};
