import { Client } from "../Client";
import {GATEWAY_BASE_URL, GATEWAY_ENCODING, GATEWAY_VERSION} from "../rest/EndPoint";
import {GatewayDispatchPayload} from "discord-api-types";
import {HELLO, HEARTBEAT, 
        HEARTBEAT_ACK, GATEWAY_IDENTIFY, 
        DISPATCH, READY, PRESENCE_UPDATE} from './OPCodes';
import WebSocket = require('ws')
import { GatewayIdentifyData } from "../Data/GatewayIdentify";
import { GatewayPayload } from "../Data/GatewayPayload";
import { UserPresence } from "../structures/User";
import { ready } from "./Events/ready";

export class Gateway {

    private _ws?: WebSocket | null = null;
    private _isEnabled: boolean;
    private _heartbeat_interval?: number;
    private _last_heartbeat?: number;
    private _last_heartbeat_ack?: number;
    private _sequence?: number;
    private _wsURL?: string;

    constructor(private _client: Client){}

    public heartbeat(){
        if(this._sequence) this.sendToWS(HEARTBEAT, this._sequence)
        else this.sendToWS(HEARTBEAT, null)
        this._last_heartbeat = Date.now()
        setInterval(() => {
            this.heartbeat()
        }, this._heartbeat_interval)
    }

    public identify(){
        var data: GatewayIdentifyData = {
            token: this._client.token,
            intents: this._client.intents,
            properties: {
                $os: process.platform,
                $browser: "ts-scord",
                $device: "ts-scord"
            }
        }
        if(this._client.user.presence){
            this._client.user.presence.activities.forEach((a) => {
                if(!a.created_at) a.created_at = Date.now();
            })
        }
        data.presence = this._client.user.presence;
        
        this.sendToWS(GATEWAY_IDENTIFY, data)
    }

    public connect(wsUrl?: string): void{
        if(this._isEnabled == true || (this._ws !== null)) throw new Error(`Gateway ERROR: A WebSocket is already enabled!`)

        if(!wsUrl) wsUrl = GATEWAY_BASE_URL;

        this._wsURL = wsUrl;
        
        this.initWs(wsUrl)
    }

    public reconnect() {
        this._ws = null;
        this._isEnabled = false;
        this._last_heartbeat = undefined;
        this._last_heartbeat_ack = undefined;
        this._sequence = undefined;
        this._wsURL = undefined;
        this._heartbeat_interval = undefined;

        this.connect()
    }

    public handleEvent(message: GatewayDispatchPayload){
        this._client.emit('rawWs', {
            name: message.t,
            data: message.d
        })
        switch(message.t){
            case READY:
                new ready(this._client).handle(message)
                this._client.emit('ready', {
                    name: message.t,
                    data: message.d
                })
                break;
        }
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
    }

    private onWsMessage(msg: string){
        const message: GatewayPayload = JSON.parse(msg) as GatewayPayload
        if(message.s) this._sequence = message.s
        switch(message.op){
            case HELLO:
                this._heartbeat_interval = message.d.heartbeat_interval;
                this.heartbeat();
                this.identify();
                break;
            case HEARTBEAT_ACK:
                this._last_heartbeat_ack = Date.now();
                break;
            case DISPATCH:
                this.handleEvent(message as GatewayDispatchPayload)
        }
    }

    private onWsError(error) {
        console.log(error)
    }

    private onWsClose(code: number, reason: string): void {
        switch(code) {
            case 4008:
                setTimeout(() => {
                    this.reconnect()
                }, 5000)
                console.log('Rate limited => reconnection...')
                break;
            default:
                throw new Error(`Gateway ERROR: ${code} => ${reason}`);
        }
    }

    private sendToWS(code: number, data?: any){
        if(!this._ws) return;
        this._ws.send(JSON.stringify({op: code, d: data})) 
    }

    public updatePresence(d: UserPresence){
        this.sendToWS(PRESENCE_UPDATE, d) 
    }
}