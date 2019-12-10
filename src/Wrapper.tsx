import { ComponentType, mount, render, shallow } from "enzyme";
import * as React from "react";

export default class Wrapper<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> {
  // Properties that remain throughout instance lifecycle
  protected defaultChildren: React.ReactNode;
  protected defaultProps: Partial<P> = {};
  protected WrappingComponent: ComponentType<any> | undefined = undefined;

  // Properties that are cleared whenever shallow/mount/render are called
  protected children: React.ReactNode;
  protected props: Partial<P> = {};

  protected get mergedProps() {
    return {
      children: this.children || this.defaultChildren,
      ...this.defaultProps,
      ...this.props
    };
  }

  constructor(protected readonly Component: C) {}

  public withDefaultChildren = (children: React.ReactNode) => {
    this.defaultChildren = children;

    return this;
  };

  public withDefaultProps = (props: Partial<P>) => {
    this.defaultProps = props;

    return this;
  };

  public withChildren = (children: React.ReactNode) => {
    this.children = children;

    return this;
  };

  public withProps = (props: Partial<P>) => {
    this.props = props;

    return this;
  };

  public mount = () => {
    const props = this.mergedProps as P;
    const wrapper = mount<C>(<this.Component {...props} />, {
      wrappingComponent: this.WrappingComponent
    });

    this.reset();

    return {
      props,
      wrapper
    };
  };

  public render = () => {
    const props = this.mergedProps as P;
    const wrapper = render(
      this.WrappingComponent ? (
        <this.WrappingComponent>
          <this.Component {...props} />
        </this.WrappingComponent>
      ) : (
        <this.Component {...props} />
      )
    );

    this.reset();

    return {
      props,
      wrapper
    };
  };

  public shallow = () => {
    const props = this.mergedProps as P;
    const wrapper = shallow(
      this.WrappingComponent ? (
        <this.WrappingComponent>
          <this.Component {...props} />
        </this.WrappingComponent>
      ) : (
        <this.Component {...props} />
      )
    );

    this.reset();

    return {
      props,
      wrapper
    };
  };

  protected reset() {
    this.children = undefined;
    this.props = {};
  }
}
