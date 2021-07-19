import { GatewayIdentifyData, GatewayPresenceUpdateData } from 'discord-api-types';
import {gateway} from './gateway/gateway'
import {restAPI} from './rest/restAPI';
import {RestError} from './rest/RestError';

interface ClientSettings{
    isABot;
    setAllToCache: boolean;
}

export class Client {
    private _token: string;

    public intents: any[];

    public isABot: boolean = true;

    public setAllToCache: boolean = false; 

    public presence?: GatewayPresenceUpdateData;

    private readonly _restAPI: restAPI;

    private readonly _gateway: gateway;

    constructor(token: string, intents: any[], clientsettings?: ClientSettings){
        this._token = 'Bot ' + token;
        this.intents = intents;

        this._restAPI = new restAPI(this)
        this._gateway = new gateway(this)

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

    public setPresence(data: GatewayPresenceUpdateData){
        this.presence = data;
    }

}