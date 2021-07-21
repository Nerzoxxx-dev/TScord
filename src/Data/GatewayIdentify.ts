import { UserPresence } from "../structures/User";

export interface GatewayIdentifyData {
    /** @var string */
    token: string;

    /** @var GatewayIdentifyProperties */
    properties: GatewayIdentifyProperties;

    /** @var boolean? */
    compress?: boolean;

    /** @var number */
    large_threshold?: number;

    /** @var number[]? */
    shard?: number[];

    /** @var UserPresence? */
    presence?: UserPresence;

    /** @var number */
    intents: number;
}

export interface GatewayIdentifyProperties {
    /** @var string */
    $os: string;

    /** @var string */
    $browser: string;

    /** @var string */
    $device: string;
}