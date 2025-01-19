import { FilterFn } from "../filters";
import { Context, Middleware } from "../types";
export declare class Bot {
    private middlewares;
    private botClient;
    constructor(token: string);
    start(handler: (ctx: Context) => Promise<void>): void;
    help(handler: (ctx: Context) => Promise<void>): void;
    command(command: string, handler: (ctx: Context) => Promise<void>): void;
    on(filter: string | FilterFn, handler: (ctx: Context) => Promise<void>): void;
    lounch(): void;
    use(handler: Middleware): void;
    private runMiddlewares;
    private handleMessage;
    private _getUpdates;
}
//# sourceMappingURL=Bot.d.ts.map