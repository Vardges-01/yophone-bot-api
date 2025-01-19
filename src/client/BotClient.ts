import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import fs from "fs";
import FormData from "form-data";

export class BotClient {
    client: AxiosInstance;

    constructor(token: string) {
        this.client = axios.create({
            baseURL: "https://yoai.yophone.com/api/pub",
            headers: {
                post: {
                    "X-YoAI-API-Key": token,
                },
            },
        } as CreateAxiosDefaults);
    }

    async sendMessage(to: string, text: string): Promise<void> {
        await this.client.post("/sendMessage", { to, text });
    }

    async sendPhoto(to: string, text: string, photo: string): Promise<void> {
        if(!fs.existsSync(photo)){
            throw "File is not found at path " + photo
        }

        const formdata = new FormData();
        formdata.append("to", to);
        formdata.append("text", text);
        formdata.append("file", fs.createReadStream(photo), photo);

        await this.client.post("/sendMessage", formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    getUpdates(): Promise<any> {
        return this.client.post("/getUpdates");
    }
}