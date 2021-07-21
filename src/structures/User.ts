import {Base} from './Base';
import {Snowflake} from '../TUtils/Snowflake';
import { APIUser, UserFlags, UserPremiumType } from 'discord-api-types';
import {Client} from '../Client';
import {Activity} from '../Data/Activity';

export class User extends Base {
    /** User's id */
    public id: Snowflake;
    /** User's username */
    public username: string;
    /** User's discriminator */
    public discriminator: string;
    /** User's avatar */
    public avatar: string | null;
    /** If the user is a bot */
    public bot?: boolean;
    /** If the user is an official Discord system */
    public system?: boolean;
    /** If the user has the 2FA authentification enabled */
    public fa_enabled?: boolean;
    /** The user language option */
    public language?: string;
    /** If the user's email is verified */
    public email_verified?: boolean;
    /** The user's flags. */
    public flags?: UserFlags;
    /** The user's nitro subscription. It's undefined if he haven't nitro */
    public premium_type: UserPremiumType;
    /** The user's public Flags */
    public public_flags: UserFlags;

    constructor(client: Client, api: APIUser){
        super(client);
        this.initData(api);
    }

    private initData(api: APIUser){
        this.id = api.id;
        this.username = api.username;
        this.discriminator = api.discriminator;
        this.avatar = api.avatar;
        this.bot = api.bot;
        this.system = api.system;
        this.fa_enabled = api.mfa_enabled;
        this.language = api.locale;
        this.email_verified = api.verified;
        this.flags = api.flags;
        this.premium_type = api.premium_type;
        this.public_flags = api.public_flags;
    }

    public getAvatarUrl(): string | null {
        return this.avatar;
    }

    public isABot(): boolean {
        if(this.bot !== undefined) return this.bot;
        return false;
    }
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
