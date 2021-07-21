import { Base } from './Base';
import { Snowflake } from '../TUtils/Snowflake';
import { APIUser, UserFlags, UserPremiumType } from 'discord-api-types';
import { Client } from '../Client';
import { Activity } from '../Data/Activity';
export declare class User extends Base {
    /** User's id */
    id: Snowflake;
    /** User's username */
    username: string;
    /** User's discriminator */
    discriminator: string;
    /** User's avatar */
    avatar: string | null;
    /** If the user is a bot */
    bot?: boolean;
    /** If the user is an official Discord system */
    system?: boolean;
    /** If the user has the 2FA authentification enabled */
    fa_enabled?: boolean;
    /** The user language option */
    language?: string;
    /** If the user's email is verified */
    email_verified?: boolean;
    /** The user's flags. */
    flags?: UserFlags;
    /** The user's nitro subscription. It's undefined if he haven't nitro */
    premium_type: UserPremiumType;
    /** The user's public Flags */
    public_flags: UserFlags;
    constructor(client: Client, api: APIUser);
    private initData;
    getAvatarUrl(): string | null;
    isABot(): boolean;
}
export interface UserPresence {
    /** @var number */
    since: number;
    /** @var Activities[] */
    activities?: Activity[];
    /** @var 'online' | 'offline' | 'dnd' | 'idle' | 'invisible' */
    status: 'online' | 'offline' | 'dnd' | 'idle' | 'invisible';
    /** @var boolean */
    afk: boolean;
}
