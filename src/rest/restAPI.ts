import axios, {AxiosInstance, Method} from 'axios';
import { Client } from '../Client';
import { User } from '../structures/User';
import { Snowflake } from '../TUtils/Snowflake';
import {AVATAR_URL, GUILD, REST_BASE_URL, USER} from './EndPoint';
import {RestError} from './RestError';


export class restAPI{
    private _instance: AxiosInstance;

    constructor(private _client: Client){
        this._instance = axios.create({
            baseURL: REST_BASE_URL,
            timeout: 5000,
            headers: {Authorization: this._client.token}
        });
    }

    public sendRequest(method: Method, url: string, data?: object): Promise<any>{
        return new Promise(async(resolve, reject) => {
            const response = await this._instance({
                url: url,
                method: method, 
                data: data
            }).catch((e) => {
                return reject(new RestError(e.response.data.code, `API ERROR: ${e.response.data.message}`))
            })
            if(response) resolve(response.data)
            else reject(new Error('No response from api'))
        })
    }


    public fetchUserObject(id: Snowflake){
        return this._client.restAPI.sendRequest('GET', USER(id))
    }

    public fetchGuildObject(id: Snowflake){
        return this._client.restAPI.sendRequest('GET', GUILD(id))
    }
}