import { Context } from "../types";

type TextType = 'text' | 'emoji';

export type FilterFn = (ctx: Context) => boolean;

export const message = (type: TextType): FilterFn => {
    return (ctx: Context) => ctx.type === type;
};