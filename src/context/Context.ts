import { BotClient } from "../client/BotClient";
import { Context as IContext, Sender, Update } from "../types";

export class Context implements IContext {
    update: Update;
    content: string;
    sender: Sender;
    type: string;
    private botClient: BotClient;

    constructor(update: Update, content: string, sender: Sender, botClient: BotClient) {
        this.update = update;
        this.content = content || "";
        this.sender = sender;
        this.type = update.type || "text";
        this.botClient = botClient;
    }

    async reply(text: string): Promise<void> {
        return this.botClient.sendMessage(this.sender.id, text);
    }

    async replyWithPhoto(photo: string): Promise<void> {
        return this.botClient.sendPhoto(this.sender.id, "photo", photo);
    }
}