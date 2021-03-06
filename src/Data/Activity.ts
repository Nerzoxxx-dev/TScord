import {Snowflake} from '../TUtils/Snowflake';

export interface Activity {
    /** @var string */
    name: string;

    /** @var number */
    type: 0 | 1 | 2 | 3 | 4 | 5;

    /** @var string? */
    url?: string;

    /** @var number */
    created_at?: number;

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
    /** @var string? */
    start?: number;

    /** @var string? */
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
