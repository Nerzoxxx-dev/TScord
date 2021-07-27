import { APIChannel } from "discord-api-types";
import { Client } from "../..";
import { GuildChannel } from "../..";
import { MSGOptionsWithContent, MessageOptions } from "../Message";

export class TextChannel extends GuildChannel {
    constructor(client: Client, data: APIChannel) {
        super(client, data)
    }

    public async sendMessage(content: string, options?: MessageOptions);
    public async sendMessage(MessageContentWithOption: MSGOptionsWithContent);
    public async sendMessage(content: string | MSGOptionsWithContent, options?: MessageOptions){
        if(typeof content == "string"){
            this.client.createMessage(this.id, content, options)
        }else{
            this.client.createMessage(this.id, content)
        }
    }
}