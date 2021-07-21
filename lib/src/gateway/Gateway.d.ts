import { Client } from "../Client";
import { GatewayDispatchPayload } from "discord-api-types";
export declare class Gateway {
    private _client;
    private _ws?;
    private _isEnabled;
    private _heartbeat_interval;
    private _last_heartbeat?;
    private _last_heartbeat_ack?;
    private _sequence?;
    constructor(_client: Client);
    heartbeat(): void;
    identify(): void;
    connect(wsUrl?: string): void;
    handleEvent(message: GatewayDispatchPayload): void;
    private initWs;
    private onWsOpen;
    private onWsMessage;
    private onWsError;
    private onWsClose;
    private sendToWS;
}
