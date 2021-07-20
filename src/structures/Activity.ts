import {Snowflake} from '../TUtils/Snowflake';

export interface Activity {
    /** @var string */
    name: string;

    /** @var ActivityType */
    type: ActivityType;

    /** @var string? */
    url?: string;

    /** @var number */
    created_at: number;

    /** @var ActivityTimestamps */
    timestamps?: ActivityTimestamps;

    /** @var Snowflake? */
    application_id?: Snowflake;

    /** @var string? */
    details?: string;

    /** @var string? */
    state?: string;

    /** @var ActivityEmoji? */
    emoji?: ActivityEmoji;

    /** @var ActivityParty? */
    party?: ActivityParty;

    /** @var ActivityAssets? */
    assets?: ActivityAssets;

    /** @var ActivitySecrets? */
    secrets?: ActivitySecrets;

    /** @var boolean? */
    instance?: boolean;

    /** @var number? */
    flags?: number;

    /** @var ActivityButtons[] */
    buttons?: ActivityButtons;
}

export interface ActivityTimestamps {
    /** @var start? */
    start?: number;

    /** @var end? */
    end?: number;
}

export interface ActivityEmoji {
    /** @var string */
    name: string;

    /** @var Snowflake? */
    id?: Snowflake;

    /** @var boolean? */
    animated?: boolean;
}

export enum ActivityTypeEnum {
    'PLAYING' = 0,
    'STREAMING' = 1,
    'LISTENING' = 2,
    'WATCHING' = 3,
    'CUSTOM' = 4,
    'COMPETING' = 5,
}

type ActivityType = keyof typeof ActivityTypeEnum;

export interface ActivityParty {
    /** @var Snowflake? */
    id?: Snowflake;

    /** @var number[]? */
    size?: number[];
}

export interface ActivityAssets {
    /** @var string? */
    large_image?: string;

    /** @var string? */
    large_text?: string;

    /** @var string? */
    small_image?: string;

    /** @var string? */
    small_text?: string;
}

export interface ActivitySecrets {
    /** @var string? */
    join?: string;

    /** @var string? */
    spectacle?: string;

    /** @var string? */
    match?: string;
}

export interface ActivityButtons {
    /** @var string */
    label: string;

    /** @var string */
    url: string;
}
