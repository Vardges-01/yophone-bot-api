export interface Sender {
    id: string;
}

export interface Update {
    text: string;
    sender: Sender;
    [key: string]: any;
}

export type Middleware = (ctx: Context, next: () => Promise<void>) => Promise<void>;

export interface Context {
    update: Update;
    content: string;
    sender: Sender;
    type:string;
    reply(text: string): Promise<void>;
    replyWithPhoto(photo: string): Promise<void>;
}