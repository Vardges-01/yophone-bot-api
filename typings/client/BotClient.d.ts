import { AxiosInstance } from "axios";
export declare class BotClient {
    client: AxiosInstance;
    constructor(token: string);
    sendMessage(chatId: string, text: string): Promise<void>;
    sendPhoto(chatId: string, text: string, photo: string): Promise<void>;
    getUpdates(): Promise<any>;
}
//# sourceMappingURL=BotClient.d.ts.map