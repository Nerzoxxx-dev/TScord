import { Client } from "../../Client";
import { GUILDS } from "../../rest/EndPoint";
import { Base } from "./Base";

export class ready extends Base{
    constructor(client: Client){
        super(client)
    }

    async handle() {
        this._client.restAPI.sendRequest('GET', GUILDS).then(r => {
            console.log(r)
        })
    }
}