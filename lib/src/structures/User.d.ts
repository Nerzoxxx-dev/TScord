import { Base } from './Base';
import { APIUser } from 'discord-api-types';
import { Client } from '../Client';
import { Activity } from '../Data/Activity';
export declare class User extends Base {
    private _client;
    private _api;
    construtor(client: Client, api: APIUser): void;
}
export interface UserPresence {
    /** @var number */
    since: number;
    /** @var Activities[] */
    activities?: Activity[];
    /** @var 'online' | 'offline' | 'dnd' | 'idle' | 'invisible' */
    status: 'online' | 'offline' | 'dnd' | 'idle' | 'invisible';
    /** @var boolean */
    afk: boolean;
}
