import { APIChannel } from "discord-api-types";
import { Client } from "../../Client";
import { Snowflake } from "../..";
import { Base } from "../Base";

export class Channel extends Base {
    /** The id of the channel */
    public id: Snowflake;
    /** The type of the channel */
    public type: ChannelTypes;
    /** The mention of the channel */
    public mention: string;

    constructor(client: Client, protected data: APIChannel) {
        super(client)
        this.id = data.id;
        this.type = data.type as unknown as ChannelTypes;
        this.mention = `<#${this.id}>`;
    }
}

export enum ChannelTypes {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_NEWS = 5,
    GUILD_STORE = 6,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD = 11,
    GUILD_PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13
}