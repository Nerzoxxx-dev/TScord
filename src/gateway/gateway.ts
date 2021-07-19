import { Client } from "../Client";
import {GATEWAY_BASE_URL, GATEWAY_ENCODING, GATEWAY_VERSION} from "../rest/EndPoint";
import {GatewayIdentifyData, GatewayReceivePayload} from "discord-api-types";
import {HELLO, HEARTBEAT, HEARTBEAT_ACK, GATEWAY_IDENTIFY} from './OPCodes';
import WebSocket = require('ws')

export class gateway {

    private _ws?: WebSocket;

    private _isEnabled: boolean;

    private _heartbeat_interval: number;

    private _sequence?: number;

    constructor(private _client: Client){}

    public heartbeat(){
        if(this._sequence) this.sendToWS(HEARTBEAT, this._sequence)
        else this.sendToWS(HEARTBEAT, null)
        setInterval(() => {
            this.heartbeat()
        }, this._heartbeat_interval)
    }

    public identify(){
        var data: GatewayIdentifyData = {
            token: this._client.token,
            intents: 513,
            properties: {
                $os: process.platform,
                $browser: "ts-scord",
                $device: "ts-scord"
            }
        }
        if(this._client.presence) data.presence = this._client.presence
        
        this.sendToWS(GATEWAY_IDENTIFY, data)
    }

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
        if(message.s) this._sequence = message.s
        switch(message.op){
            case HELLO:
                this._heartbeat_interval = message.d.heartbeat_interval;
                this.heartbeat();
                this.identify();
                break;
            case HEARTBEAT_ACK:
                console.log('coucou')
        }
    }

    private onWsError(error) {
        throw new Error(error)
    }

    private onWsClose(code: number, reason: string): void {
        throw new Error(`Gateway ERROR: ${code} => ${reason}`);
    }

    private sendToWS(code: number, data?: any){
        if(!this._ws) return;
        this._ws.send(JSON.stringify({op: code, d: data})) 
    }
}