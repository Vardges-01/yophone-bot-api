import { BotClient } from "../client/BotClient";
import { Context as IContext, Sender, Update } from "../types";
export declare class Context implements IContext {
    update: Update;
    content: string;
    sender: Sender;
    type: string;
    private botClient;
    constructor(update: Update, content: string, sender: Sender, botClient: BotClient);
    reply(text: string): Promise<void>;
    replyWithPhoto(photo: string): Promise<void>;
}
//# sourceMappingURL=Context.d.ts.map