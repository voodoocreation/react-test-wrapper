import { ComponentType, mount, render, shallow } from "enzyme";
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
    this.beforeMount();

    const props = this.defineProps() as P;
    const wrapper = mount<P>(<this.Component {...props} />, {
      wrappingComponent: this.WrappingComponent,
    });

    this.reset();

    return wrapper;
  };

  public render = () => {
    this.beforeMount();

    const props = this.defineProps() as P;
    const wrapper = render<P, React.ComponentState>(
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
    this.beforeMount();

    const props = this.defineProps() as P;
    const wrapper = shallow<P>(
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

  protected beforeMount = () => {
    // Implement this method when extending to define properties to pass to `WrappingComponent`
  };

  protected defineProps = () => {
    this.mergedProps = {
      ...this.defaultProps,
      ...this.scenarioProps,
      children: this.scenarioChildren || this.defaultChildren,
    };

    return this.mergedProps;
  };

  protected reset() {
    this.scenarioChildren = undefined;
    this.scenarioProps = {};
  }
}
