import * as React from "react";

import { Wrapper } from "./TestWrapperWithRedux.js";
import { HookWrapper, THook } from "../../src/index.js";

export class TestHookWrapper<
  H extends THook,
  W extends Wrapper<React.ComponentType<any>>,
> extends HookWrapper<H, W> {
  constructor(hook: H) {
    super(hook);

    this.wrapper = new Wrapper(this.WrappingComponent) as W;
  }
}
