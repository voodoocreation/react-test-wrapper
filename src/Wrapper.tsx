import { ComponentType, mount, render, shallow } from "enzyme";
import merge from "merge-deep";
import * as React from "react";

export default class Wrapper<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C> = React.ComponentProps<C>
> {
  // Properties that are implemented in classes that extend Wrapper
  protected WrappingComponent: ComponentType<any> | undefined = undefined;

  // Properties that remain throughout instance lifecycle
  protected defaultChildren: React.ReactNode;
  protected defaultProps: Partial<P> = {};

  // Scenario-specific properties that are cleared whenever shallow/mount/render are called
  protected scenarioChildren: React.ReactNode;
  protected scenarioProps: Partial<P> = {};

  // Properties to be accessed via getters after mounting
  protected mergedProps: Partial<P> = {};

  constructor(protected readonly Component: C) {}

  public get props() {
    return this.mergedProps;
  }

  public withDefaultChildren = (children: React.ReactNode) => {
    this.defaultChildren = children;

    return this;
  };

  public withDefaultProps = (props: Partial<P>) => {
    this.defaultProps = props;

    return this;
  };

  public withChildren = (children: React.ReactNode) => {
    this.scenarioChildren = children;

    return this;
  };

  public withProps = (props: Partial<P>) => {
    this.scenarioProps = props;

    return this;
  };

  public mount = () => {
    const props = this.defineProps() as P;
    const wrapper = mount<C>(<this.Component {...props} />, {
      wrappingComponent: this.WrappingComponent
    });

    this.reset();

    return wrapper;
  };

  public render = () => {
    const props = this.defineProps() as P;
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

    return wrapper;
  };

  public shallow = () => {
    const props = this.defineProps() as P;
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

    return wrapper;
  };

  protected defineProps = () => {
    this.mergedProps = merge({}, this.defaultProps, this.scenarioProps, {
      children: this.scenarioChildren || this.defaultChildren
    });

    return this.mergedProps;
  };

  protected reset() {
    this.scenarioChildren = undefined;
    this.scenarioProps = {};
  }
}
