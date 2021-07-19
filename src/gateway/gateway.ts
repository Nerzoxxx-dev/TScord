import { Client } from "../Client";
import {GATEWAY_BASE_URL, GATEWAY_ENCODING, GATEWAY_VERSION} from "../rest/EndPoint";
import {GatewayReceivePayload} from "discord-api-types";
import {HELLO} from './OPCodes';
import WebSocket = require('ws')

export class gateway {

    private _ws?: WebSocket;

    private _isEnabled: boolean;

    constructor(private _client: Client){}

    public connect(wsUrl?: string): void{
        if(this._isEnabled == true || (this._ws && this._ws.readyState == 1)) throw new Error(`Gateway ERROR: A WebSocket is already enabled!`)

        if(!wsUrl) wsUrl = GATEWAY_BASE_URL;
        
        this.initWs(wsUrl)
    }

    private initWs(wsUrl?: string){
        //currently, v=9 & encoding=json
        this._ws = new WebSocket(`${wsUrl}/?v=${GATEWAY_VERSION}&encoding=${GATEWAY_ENCODING}`);
        this._ws.on('open', () => this.onWsOpen())
        this._ws.on('message', (msg) => this.onWsMessage(msg as string))
        this._ws.on('error', (error) => this.onWsError(error))
        this._ws.on('close', (code, reason) => this.onWsClose(code, reason))
    }

    private onWsOpen() {
        //console.log('hello')
    }

    private onWsMessage(msg: string){
        const message = JSON.parse(msg) as GatewayReceivePayload
        switch(message.op){
            case HELLO:
                console.log('hello')
        }
    }

    private onWsError(error) {
        throw new Error(error)
    }

    private onWsClose(code: number, reason: string): void {
        throw new Error(`Gateway ERROR: ${code} => ${reason}`);
    }
}