import { AxiosInstance } from "axios";
export declare class BotClient {
    client: AxiosInstance;
    constructor(token: string);
    sendMessage(to: string, text: string): Promise<void>;
    sendPhoto(to: string, text: string, photo: string): Promise<void>;
    getUpdates(): Promise<any>;
}
//# sourceMappingURL=BotClient.d.ts.map