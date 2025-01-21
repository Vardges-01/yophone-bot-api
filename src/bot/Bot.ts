import { BotClient } from "../client/BotClient";
import { Context as IContext } from "../context/Context";
import { FilterFn } from "../filters";
import { Context, Middleware, Update } from "../types";
import { getTextType, wait } from "../utils";

export class Bot {
    private middlewares: Middleware[];
    private botClient: BotClient;

    constructor(token: string) {
        this.middlewares = [];
        this.botClient = new BotClient(token);
    }

    /**
     * Add a middleware to the chain.
     * @param middleware Middleware function to add.
     */
    use(middleware: Middleware): void {
        this.middlewares.push(middleware);
    }

    start(handler: (ctx: Context, next: () => Promise<void>) => Promise<void>): void {
        this.use(async (ctx, next) => {
            if (ctx.content === ("/start")) {
                await handler(ctx, next);
            } else {
                await next();
            }
        });
    }

    help(handler: (ctx: Context, next: () => Promise<void>) => Promise<void>): void {
        this.use(async (ctx, next) => {
            if (ctx.content === ("/help")) {
                await handler(ctx, next);
            } else {
                await next();
            }
        });
    }

    command(command: string, handler: (ctx: Context, next: () => Promise<void>) => Promise<void>): void {
        this.use(async (ctx, next) => {
            if (ctx.content.startsWith("/")) {
                const commandName = ctx.content.substring(1).trim();
                if (command === commandName) {
                    await handler(ctx, next);
                    return;
                }
            }
            await next();
        });
    }

    on(filter: string | FilterFn, handler: (ctx: Context, next: () => Promise<void>) => Promise<void>): void {
        this.use(async (ctx, next) => {
            const shouldHandle = typeof filter === 'string'
                ? ctx.type === filter
                : filter(ctx);

            if (shouldHandle) {
                await handler(ctx, next);
            }
            else {
                await next();
            }
        });
    }

    hears(pattern: string | RegExp, handler: (ctx: Context, next: () => Promise<void>) => Promise<void>): void {
        this.use(async (ctx, next) => {
            if (typeof pattern === 'string') {
                if (ctx.content === pattern) {
                    await handler(ctx, next);
                    return;
                }
            } else if (pattern instanceof RegExp) {
                if (pattern.test(ctx.content)) {
                    await handler(ctx, next);
                    return;
                }
            }
            await next();
        });
    }


    lounch(): void {
        this._getUpdates();
        console.log('BOT started...')
    }

    /**
     * Run the middleware chain.
     * @param ctx Context object passed to middlewares.
     */
    private async runMiddlewares(ctx: Context): Promise<void> {
        let index = 0;

        const next = async (): Promise<void> => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index];
                index++;
                await middleware(ctx, next);
            }
        };

        await next();
    }

    /**
     * Handle messages from Bot
     * @param update Message info.
     */
    private async handleMessage(update: Update): Promise<void> {
        const { text, sender } = update;

        let messageTextReceived = Buffer.from(text, "base64").toString("utf-8");

        const ctx = new IContext({ ...update, type: getTextType(messageTextReceived) }, messageTextReceived, sender, this.botClient);
        await this.runMiddlewares(ctx);
    }

    private async _getUpdates(): Promise<void> {
        try {
            const data = await this.botClient.getUpdates();

            if (data.status === 200) {
                data.data.data.forEach((m: any) => {
                    this.handleMessage(m);
                });
            }

            if (data.status === 200 || data.status === 204) {
                return this._getUpdates();
            } else if (data.status >= 500) {
                await wait(5000);
            } else if (data.status === 429) {
                console.error("Rate limit reached");
            } else {
                console.error("Service unavailable");
            }
        } catch (error: any) {
            if (error.code === "ECONNRESET" || error.code === "ERR_BAD_RESPONSE") {
                return this._getUpdates();
            } else {
                await wait(5000);
                return this._getUpdates();
            }
        }
    }
}