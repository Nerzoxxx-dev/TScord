import { Client } from "../Client";
import {GATEWAY_BASE_URL, GATEWAY_ENCODING, GATEWAY_VERSION, GUILD, USER} from "../rest/EndPoint";
import {GatewayDispatchPayload} from "discord-api-types";
import {HELLO, HEARTBEAT, 
        HEARTBEAT_ACK, GATEWAY_IDENTIFY, 
        DISPATCH, READY, PRESENCE_UPDATE, RESUME} from './OPCodes';
import WebSocket = require('ws')
import { GatewayIdentifyData } from "../Data/GatewayIdentify";
import { GatewayPayload } from "../Data/GatewayPayload";
import { UserPresence } from "../structures/User";
import { ready } from "./Events/ready";
import { GatewayException } from "../Exceptions/GatewayException";

export class Gateway {

    private _ws?: WebSocket | null = null;
    private _isEnabled: boolean;
    private _heartbeat_interval?: number;
    private _last_heartbeat?: number;
    private _last_heartbeat_ack?: number;
    private _sequence?: number;
    private _wsURL?: string;
    private _session_id?: string;
    public ping?: number;

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

    public async connect(wsUrl?: string){
        if(this._isEnabled == true || (this._ws !== null)) return new Error(`Gateway ERROR: A WebSocket is already enabled!`)

        if(!wsUrl) wsUrl = GATEWAY_BASE_URL;

        this._wsURL = wsUrl;
            
        await this.initWs(wsUrl)
    }

    public async reconnect() {
        this._ws = null;
        this._isEnabled = false;
        this._last_heartbeat = undefined;
        this._last_heartbeat_ack = undefined;
        this._sequence = undefined;
        this._wsURL = undefined;
        this._heartbeat_interval = undefined;

        await this.connect()
         setTimeout(() => {
            this.sendToWS(RESUME, {token: this._client.token, session_id: this._session_id, seq: this._sequence})
         }, 2000)
    }

    public async handleEvent(message: GatewayDispatchPayload){
        this._client.emit('rawWs', {
            name: message.t,
            data: message.d
        })
        switch(message.t){
            case READY:
                this._session_id = message.d.session_id;
                await new ready(this._client).handle(message)
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
        this._isEnabled = true;
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
                this.ping = this._last_heartbeat_ack - this._last_heartbeat;
                break;
            case DISPATCH:
                this.handleEvent(message as GatewayDispatchPayload)
        }
    }

    private onWsError(error) {
        throw new GatewayException('Gateway ERROR', error)
    }

    private onWsClose(code: number, reason: string): void {
        this.reconnect()
    }

    private sendToWS(code: number, data?: any){
        if(!this._ws) return;
        this._ws.send(JSON.stringify({op: code, d: data})) 
    }

    public updatePresence(d: UserPresence){
        this.sendToWS(PRESENCE_UPDATE, d) 
    }
}