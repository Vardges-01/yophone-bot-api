import { AxiosInstance } from "axios";
export declare class YoPhoneClient {
    client: AxiosInstance;
    constructor(token: string);
    sendMessage(chatId: string, text: string): Promise<void>;
    sendPhoto(chatId: string, text: string, photo: string): Promise<void>;
    getUpdates(): Promise<any>;
}
//# sourceMappingURL=YoPhoneClient.d.ts.map