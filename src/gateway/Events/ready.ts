import { ChannelType } from "discord-api-types";
import { Guild } from "../..";
import { Client } from "../../Client";
import { GatewayPayload } from "../../Data/GatewayPayload";
import { GUILD_CHANNELS } from "../../rest/EndPoint";
import { TextChannel } from "../../structures/Channels/TextChannel";
import { Base } from "./Base";

export class ready extends Base{
    constructor(client: Client){
        super(client)
    }

    async handle(data: GatewayPayload) {
        for(const guild of data.d.guilds){
            var g = new Guild(this._client, guild);

            var channels = await this._client.restAPI.sendRequest('GET', GUILD_CHANNELS(guild.id))
            for(const c of channels){
                if(c.type == ChannelType.GUILD_TEXT) {
                    g.channels_cache.set(c.id, new TextChannel(this._client, c))
                }
            }
            this._client.guilds.set(guild.id, g)
        }
    }
}