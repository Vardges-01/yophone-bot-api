import { FilterFn } from "../filters";
import { Context, Middleware } from "../types";
export declare class Bot {
    private middlewares;
    private yoPhoneClient;
    constructor(token: string);
    /**
     * Add a middleware to the chain.
     * @param middleware Middleware function to add.
     */
    use(middleware: Middleware): void;
    start(handler: (ctx: Context, next: () => Promise<void>) => Promise<void> | void): void;
    help(handler: (ctx: Context, next: () => Promise<void>) => Promise<void> | void): void;
    command(command: string, handler: (ctx: Context, next: () => Promise<void>) => Promise<void> | void): void;
    on(filter: string | FilterFn, handler: (ctx: Context, next: () => Promise<void>) => Promise<void> | void): void;
    hears(pattern: string | RegExp, handler: (ctx: Context, next: () => Promise<void>) => Promise<void> | void): void;
    lounch(): void;
    /**
     * Run the middleware chain.
     * @param ctx Context object passed to middlewares.
     */
    private runMiddlewares;
    /**
     * Handle messages from Bot
     * @param update Message info.
     */
    private handleMessage;
    private _getUpdates;
}
//# sourceMappingURL=Bot.d.ts.map