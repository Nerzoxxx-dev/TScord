import { Gateway } from './gateway/Gateway'
import { restAPI } from './rest/restAPI';
import { RestError } from './Exceptions/RestException';
import { Utils } from './TUtils/Utils';
import { ClientUser } from './structures/ClientUser';
import { CLIENT_USER, GATEWAY_GET_URL, GUILD, MESSAGES, USER } from './rest/EndPoint';
import EventEmitter from './EventEmitter/Emitter';
import { Collection } from './TUtils/Collection';
import { Snowflake } from 'discord-api-types';
import { User } from './structures/User';
import { Guild } from './structures/Guild';
import { MSGOptionsWithContent } from './structures/Message';
import { MessageOptions } from 'node:child_process';

interface ClientSettings{
    isABot;
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
        }
    }

    get token(): string{
        return this._token;
    }

    get ping(): number{
        return this.gateway.ping;
    }

    public connect(){
        this.restAPI.sendRequest('GET', GATEWAY_GET_URL).then((request) => {
            if(request instanceof RestError && request.code == 403) throw new Error('An invalid token was provided!')

            this.gateway.connect(request.url)
        })
    }

    public async fetchUser(id: Snowflake){
        let u = new User(this, await this.restAPI.fetchUserObject(id))
        if(!this.users.has(u.id)) this.users.set(u.id, u)
        return u
    }

    public async fetchGuild(id: Snowflake){
        let g = new Guild(this, await this.restAPI.fetchGuildObject(id))
        if(!this.guilds.has(g.id)) this.guilds.set(g.id, g)
        return g
    }

    public async createMessage(id: Snowflake, content: string | MSGOptionsWithContent, option?: MessageOptions){
        if(typeof content == "string") {
            this.restAPI.sendRequest('POST', MESSAGES(id), {content: content, options: option})
        }else {
            this.restAPI.sendRequest('POST', MESSAGES(id), content as Object)
        }
    }
}