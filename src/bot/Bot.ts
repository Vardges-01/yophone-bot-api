import { BotClient } from "../client/BotClient";
import { Context as IContext } from "../context/Context";
import { FilterFn } from "../filters";
import { Context, Middleware } from "../types";
import { getTextType, wait } from "../utils";

export class Bot {
    private middlewares: Middleware[];
    private botClient: BotClient;

    constructor(token: string) {
        this.middlewares = [];
        this.botClient = new BotClient(token);
    }

    start(handler: (ctx: Context) => Promise<void>): void {
        this.middlewares.push(async (ctx, next) => {
            if (ctx.content === ("/start")) {
                await handler(ctx);
            } else {
                await next();
            }
        });
    }

    help(handler: (ctx: Context) => Promise<void>): void {
        this.middlewares.push(async (ctx, next) => {
            if (ctx.content === ("/help")) {
                await handler(ctx);
            } else {
                await next();
            }
        });
    }

    command(command: string, handler: (ctx: Context) => Promise<void>): void {
        this.middlewares.push(async (ctx, next) => {
            if (ctx.content.startsWith("/")) {
                const commandName = ctx.content.substring(1).trim();
                if (command === commandName) {
                    await handler(ctx);
                } else {
                    await next();
                }
            } else {
                await next();
            }
        });
    }

    on(filter: string | FilterFn, handler: (ctx: Context) => Promise<void>): void {
        this.middlewares.push(async (ctx, next) => {
            const shouldHandle = typeof filter === 'string'
                ? ctx.type === filter
                : filter(ctx);

            if (shouldHandle) {
                await handler(ctx);
            }
            else {
                await next();
            }
        });
    }

    lounch(): void {
        this._getUpdates();
        console.log('BOT started...')
    }

    use(handler: Middleware): void {
        this.middlewares.push(handler);
    }

    private async runMiddlewares(ctx: Context): Promise<void> {
        const next = async (index: number) => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index];
                await middleware(ctx, () => next(index + 1));
            }
        };
        await next(0);
    }

    private async handleMessage(update: any): Promise<void> {
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