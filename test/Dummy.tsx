import * as React from "react";
import { connect } from "react-redux";

import * as actions from "./actions";
import { TStoreState } from "./store";

interface IProps {
  value: string;
  setValue?: typeof actions.setValue;
}

export class Dummy extends React.Component<IProps> {
  public render() {
    return (
      <div className="Dummy">
        <div className="Dummy--value">{this.props.value}</div>
        <div className="Dummy--children">{this.props.children}</div>
        <button className="Dummy--button" onClick={this.onClick}>
          Button
        </button>
      </div>
    );
  }

  private onClick = () => {
    if (this.props.setValue) {
      this.props.setValue("Click");
    }
  };
}

export const ConnectedDummy = connect(
  (state: TStoreState) => ({
    value: state.test.value
  }),
  actions
)(Dummy);
