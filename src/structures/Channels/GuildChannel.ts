import { APIChannel, APIOverwrite } from "discord-api-types";
import { Channel, Client } from "../..";
import { Snowflake } from "../..";
import { MSGOptionsWithContent, MessageOptions } from "../Message";

export class GuildChannel extends Channel {
    /** The name of the channel */
    public name: string;
    /** The channel topic (0-1024 characters) */
    public topic: string;
    /** The bitrate (in bits) of the voice channel (voice only) */
    public bitrate: number;
    /** The user limit of the voice channel (voice only) */
    public user_limit: number;
    /** Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected */
    public rate_limit_per_user: number;
    /** Sorting position of the channel */
    public position: number;
    /** The channel's permissions overwrites */
    public permissions_overwrites: APIOverwrite[];
    /** Id of the parent category channel */
    public parent_id: Snowflake;
    /** If the channel is an nsfw channel */
    public nsfw: boolean;

    constructor(client: Client, data: APIChannel){
        super(client, data);
    }

    public async createMessage(content, option: MessageOptions);
    public async createMessage(contentWithMSGOptions: MSGOptionsWithContent)
    public async createMessage() {

    }
}