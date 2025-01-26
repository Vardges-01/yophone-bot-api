import { YoPhoneClient } from "../client/YoPhoneClient";
import { Context as IContext, Sender, Update } from "../types";
export declare class Context implements IContext {
    update: Update;
    content: string;
    sender: Sender;
    type: string;
    yoPhone: YoPhoneClient;
    constructor(update: Update, content: string, sender: Sender, yoPhoneClient: YoPhoneClient);
    reply(text: string): Promise<void>;
    replyWithPhoto(photo: string): Promise<void>;
}
//# sourceMappingURL=Context.d.ts.map