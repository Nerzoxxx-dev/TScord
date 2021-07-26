import { APIUser, PresenceUpdateStatus } from "discord-api-types";
import { Client } from "../Client";
import { Activity } from "../Data/Activity";
import { CLIENT_USER } from "../rest/EndPoint";
import { User, UserPresence } from "./User";

export class ClientUser extends User {
    /** Client rich presence */
    public presence?: UserPresence;

    constructor(client: Client, api: APIUser){
        super(client, api)
    }
    
    public setPresence(status: 'online' | 'offline' | 'dnd' | 'idle' | 'invisible', activities?: Activity[] | Object[], since?: number, afk?: boolean) :any{
        var statusType: PresenceUpdateStatus;

        switch(status){
            case 'online':
                statusType = PresenceUpdateStatus.Online
                break;
            case 'offline':
                statusType = PresenceUpdateStatus.Offline
                break;
            case 'dnd':
                statusType = PresenceUpdateStatus.DoNotDisturb
                break;
            case 'idle':
                statusType = PresenceUpdateStatus.Idle
                break;
            case 'invisible':
                statusType = PresenceUpdateStatus.Invisible
                break;
        }

        if(!activities) activities = [{}];
        if(!since) since = Date.now()
        if(!afk){
            if(statusType == PresenceUpdateStatus.Idle){
                afk = true
            } else{
                afk = false
            }
        }

        var data: UserPresence = {
            since: since,
            status: statusType,
            afk: afk,
            activities: activities
        }

        this.client.gateway.updatePresence(data)
    }

    async init(){
        return await this.client._restAPI.sendRequest('GET', CLIENT_USER);
    }
}