import { Gateway } from './gateway/Gateway'
import { restAPI } from './rest/restAPI';
import { RestError } from './rest/RestError';
import { Utils } from './TUtils/Utils';
import { ClientUser } from './structures/ClientUser';
import { CLIENT_USER, GATEWAY_GET_URL } from './rest/EndPoint';
import EventEmitter from './EventEmitter/Emitter';
import { Collection } from './TUtils/Collection';
import { Snowflake } from 'discord-api-types';
import { User } from './structures/User';
import { Guild } from './structures/Guild';

interface ClientSettings{
    isABot;
    setAllToCache: boolean;
}

export class Client extends EventEmitter<{
    /** the event when the client is ready */
    ready;

    /** the event when the client receive data packet */
    rawWs;

    }>{

    private _token: string;
    public intents: number;
    public isABot: boolean = true;
    public setAllToCache: boolean = false; 
    public user: ClientUser;
    public readonly restAPI: restAPI;
    public readonly gateway: Gateway;

    //cache
    public users: Collection<Snowflake, User>;
    public guilds: Collection<Snowflake, Guild>;

    constructor(token: string, intents: number[], clientsettings?: ClientSettings){
        super()
        this._token = 'Bot ' + token;
        this.restAPI = new restAPI(this);
        this.gateway = new Gateway(this);
        this.restAPI.sendRequest('GET', CLIENT_USER).then(r => {
            this.user = new ClientUser(this, r);
        })
        this.users = new Collection<Snowflake, User>();
        this.guilds = new Collection<Snowflake, Guild>();

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

    public connect(){
        this.restAPI.sendRequest('GET', GATEWAY_GET_URL).then((request) => {
            if(request instanceof RestError && request.code == 403) throw new Error('An invalid token was provided!')

            this.gateway.connect(request.url)
        })
    }

    public fetchUser(id: Snowflake){
        return this.users.fetch(id)
    }

    public fetchGuilds(id: Snowflake){
        return this.guilds.fetch(id)
    }
}