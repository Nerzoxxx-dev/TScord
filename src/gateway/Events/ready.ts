import { Client } from "../../Client";
import { GatewayPayload } from "../../Data/GatewayPayload";
import { Base } from "./Base";

export class ready extends Base{
    constructor(client: Client){
        super(client)
    }

    async handle(data: GatewayPayload) {
        for(const guild of data.d.guilds){
            this._client.guilds.set(guild.id, guild)
        }
    }
}