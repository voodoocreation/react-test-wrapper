import { DeepPartial as BaseDeepPartial } from "utility-types";

export type DeepPartial<T> = BaseDeepPartial<T> | Record<never, never>;
