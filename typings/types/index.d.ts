import { YoPhoneClient } from "../client/YoPhoneClient";
export interface Sender {
    id: string;
    firstName: string;
    lastName: string;
}
export interface Update {
    id: number;
    botId: string;
    chatId: string;
    text: string;
    sender: Sender;
    [key: string]: any;
}
export type Middleware = (ctx: Context, next: () => Promise<void>) => Promise<void>;
export interface Context {
    update: Update;
    content: string;
    sender: Sender;
    type: string;
    yoPhone: YoPhoneClient;
    reply(text: string): Promise<void>;
    replyWithPhoto(photo: string): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map