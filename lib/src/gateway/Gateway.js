"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EndPoint_1 = require("../rest/EndPoint");
const OPCodes_1 = require("./OPCodes");
const WebSocket = require("ws");
class Gateway {
    constructor(_client) {
        this._client = _client;
    }
    heartbeat() {
        if (this._sequence)
            this.sendToWS(OPCodes_1.HEARTBEAT, this._sequence);
        else
            this.sendToWS(OPCodes_1.HEARTBEAT, null);
        this._last_heartbeat = Date.now();
        setInterval(() => {
            this.heartbeat();
        }, this._heartbeat_interval);
    }
    identify() {
        var data = {
            token: this._client.token,
            intents: this._client.intents,
            properties: {
                $os: process.platform,
                $browser: "ts-scord",
                $device: "ts-scord"
            }
        };
        if (this._client.presence) {
            this._client.presence.activities.forEach((a) => {
                if (!a.created_at)
                    a.created_at = Date.now();
            });
        }
        data.presence = this._client.presence;
        this.sendToWS(OPCodes_1.GATEWAY_IDENTIFY, data);
    }
    connect(wsUrl) {
        if (this._isEnabled == true || (this._ws && this._ws.readyState == 1))
            throw new Error(`Gateway ERROR: A WebSocket is already enabled!`);
        if (!wsUrl)
            wsUrl = EndPoint_1.GATEWAY_BASE_URL;
        this.initWs(wsUrl);
    }
    handleEvent(message) {
        switch (message.t) {
            case OPCodes_1.READY:
                //ToDo: Use event function
                console.log('ready!');
                break;
        }
    }
    initWs(wsUrl) {
        //currently, v=9 & encoding=json
        this._ws = new WebSocket(`${wsUrl}/?v=${EndPoint_1.GATEWAY_VERSION}&encoding=${EndPoint_1.GATEWAY_ENCODING}`);
        this._ws.on('open', () => this.onWsOpen());
        this._ws.on('message', (msg) => this.onWsMessage(msg));
        this._ws.on('error', (error) => this.onWsError(error));
        this._ws.on('close', (code, reason) => this.onWsClose(code, reason));
    }
    onWsOpen() {
    }
    onWsMessage(msg) {
        const message = JSON.parse(msg);
        if (message.s)
            this._sequence = message.s;
        switch (message.op) {
            case OPCodes_1.HELLO:
                this._heartbeat_interval = message.d.heartbeat_interval;
                this.heartbeat();
                this.identify();
                break;
            case OPCodes_1.HEARTBEAT_ACK:
                this._last_heartbeat_ack = Date.now();
                break;
            case OPCodes_1.DISPATCH:
                this.handleEvent(message);
        }
    }
    onWsError(error) {
        throw new Error(error);
    }
    onWsClose(code, reason) {
        throw new Error(`Gateway ERROR: ${code} => ${reason}`);
    }
    sendToWS(code, data) {
        if (!this._ws)
            return;
        this._ws.send(JSON.stringify({ op: code, d: data }));
    }
}
exports.Gateway = Gateway;
