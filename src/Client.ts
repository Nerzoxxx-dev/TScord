import { GatewayActivityUpdateData, GatewayPresenceUpdateData, PresenceUpdateStatus } from 'discord-api-types';
import {Gateway} from './gateway/Gateway'
import {restAPI} from './rest/restAPI';
import {RestError} from './rest/RestError';
import {Utils} from './TUtils/Utils';
import * as Intents from './Intents';
import { UserPresence } from './structures/User';
import { Activity } from './Data/Activity';

interface ClientSettings{
    isABot;
    setAllToCache: boolean;
}

export class Client {
    private _token: string;

    public intents: number;

    public isABot: boolean = true;

    public setAllToCache: boolean = false; 

    public presence?: UserPresence;

    private readonly _restAPI: restAPI;

    private readonly _gateway: Gateway;

    constructor(token: string, intents: number[], clientsettings?: ClientSettings){
        this._token = 'Bot ' + token;
        this._restAPI = new restAPI(this)
        this._gateway = new Gateway(this)

        if(Utils.hasDuplicates(intents)) throw new Error('Duplicates intents are not allowed.')

        var allIntents: number = 0;
        intents.forEach((i) => {
            allIntents += i;
        })
        this.intents = allIntents;

        if(clientsettings){
            if(clientsettings.isABot){
                this.isABot = clientsettings.isABot;
            }
            if(clientsettings.setAllToCache){
                this.setAllToCache = clientsettings.setAllToCache;
            }
        }
    }

    get token(): string{
        return this._token;
    }

    get restAPI(){
        return this._restAPI;
    }

    public connect(){
        this._restAPI.sendRequest('GET', '/gateway/bot').then((request) => {
            if(request instanceof RestError && request.code == 403) throw new Error('An invalid token was provided!')

            this._gateway.connect(request.url)
        })
    }

    public setPresence(status: 'online' | 'offline' | 'dnd' | 'idle' | 'invisible', activities: Activity[], since?: number, afk?: boolean) :any{
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

        return this.presence = data;
    }
}