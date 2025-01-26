import { YoPhoneClient } from "../client/YoPhoneClient";
import { Context as IContext, Sender, Update } from "../types";

export class Context implements IContext {
    update: Update;
    content: string;
    sender: Sender;
    type: string;
    yoPhone: YoPhoneClient;

    constructor(update: Update, content: string, sender: Sender, yoPhoneClient: YoPhoneClient) {
        this.update = update;
        this.content = content || "";
        this.sender = sender;
        this.type = update.type || "text";
        this.yoPhone = yoPhoneClient;
    }

    async reply(text: string): Promise<void> {
        return this.yoPhone.sendMessage(this.sender.id, text);
    }

    async replyWithPhoto(photo: string): Promise<void> {
        return this.yoPhone.sendPhoto(this.sender.id, "photo", photo);
    }
}