import { Context } from "./types";
type TextType = 'text' | 'emoji';
export type FilterFn = (ctx: Context) => boolean;
export declare const message: (type: TextType) => FilterFn;
export {};
//# sourceMappingURL=filters.d.ts.map