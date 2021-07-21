import { Method } from 'axios';
import { Client } from '../Client';
export declare class restAPI {
    private _client;
    private _instance;
    constructor(_client: Client);
    sendRequest(method: Method, url: string, data?: object): Promise<any>;
}
