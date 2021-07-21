import { restAPI } from './rest/restAPI';
import { UserPresence } from './structures/User';
import { Activity } from './Data/Activity';
interface ClientSettings {
    isABot: any;
    setAllToCache: boolean;
}
export declare class Client {
    private _token;
    intents: number;
    isABot: boolean;
    setAllToCache: boolean;
    presence?: UserPresence;
    private readonly _restAPI;
    private readonly _gateway;
    constructor(token: string, intents: number[], clientsettings?: ClientSettings);
    readonly token: string;
    readonly restAPI: restAPI;
    connect(): void;
    setPresence(status: 'online' | 'offline' | 'dnd' | 'idle' | 'invisible', activities: Activity[], since?: number, afk?: boolean): any;
}
export {};
