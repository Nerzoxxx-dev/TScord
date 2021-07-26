import { APIChannel, APIEmoji, APIGuild,APIGuildMember, APIGuildWelcomeScreen, APIRole, GatewayPresenceUpdate, GatewayVoiceState, GuildDefaultMessageNotifications, GuildExplicitContentFilter, GuildFeature, GuildMFALevel, GuildPremiumTier, GuildSystemChannelFlags, GuildVerificationLevel } from "discord-api-types";
import { Client } from "../Client";
import { Collection } from "../TUtils/Collection";
import { Snowflake } from '../TUtils/Snowflake'
import { User } from "./User";

export class Guild {
    /** The icon hash, returned when in the template object */
    public icon_hash?: string;
    /** The discovery splash */
    public discovery_splash: string;
    /** The owner's user object */
    public owner?: boolean;
    /** The owner id */
    public owner_id: Snowflake;
    /** The permissions of the guild */
    public permissions?: Snowflake;
    /** The region of the guild */
    public region: string;
    /** The afk channel id */
    public afk_channel_id: Snowflake;
    /** The timeout number of afk */
    public afk_timeout: number;
    /** If the widget is enabled */
    public widget_enabled?: boolean;
    /** The widget channel id if the widget is enabled */
    public widget_channel_id?: Snowflake;
    /** The verification level */
    public verification_level: GuildVerificationLevel;
    /** The default message notifications */
    public default_message_notifications: GuildDefaultMessageNotifications;
    /** The explicit content filter */
    public explicit_content_filter: GuildExplicitContentFilter;
    /** The api roles */
    public roles: APIRole[];
    /** The api emojis */
    public emojis: APIEmoji[];
    /** The guild features */
    public features: GuildFeature[];
    /** The guild MFA level */
    public mfa_level: GuildMFALevel;
    /** The guild application id */
    public application_id: Snowflake;
    /** The guild system channel id */
    public system_channel_id: Snowflake;
    /** The guild system channel flags */
    public system_channel_flags: GuildSystemChannelFlags;
    /** The guild rules id */
    public rules_channel_id: Snowflake;
    /** When the client has joined the server */
    public joined_at?: string;
    /** True if the guild is large */
    public large?: boolean;
    /** The number of members on the guild */
    public member_count?: number;
    /** The voices stats */
    public voice_states?: Omit<GatewayVoiceState, "guild_id">[];
    /** The members on the guild */
    public members?: APIGuildMember[];
    /** The channels on the guild */
    public channels?: APIChannel[];
    /** The presences on the guild */
    public presences?: GatewayPresenceUpdate[];
    /** The max presences on the guild */
    public max_presences?: number;
    /** The max members on the guild */
    public max_members?: number;
    /** The vanity url code of the guild */
    public vanity_url_code: string;
    /** The description of the guild */
    public description: string;
    /** The banner of the guild */
    public banner: string;
    /** The premium tier of the guild */
    public premium_tier: GuildPremiumTier;
    /** The premium subscription count of the guild */
    public premium_subscription_count?: number;
    /** The preferred locale of the guild*/
    public preferred_locale: string;
    /** The public updates channel id of the guild */
    public public_updates_channel_id: Snowflake;
    /** The maximum amount of users in a video channel */
    public max_video_channel_users?: number;
    /** An approximation of the member count */
    public approximate_member_count?: number;
    /** An approximation of the presence count */
    public approximate_presence_count?: number;
    /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
    public welcome_screen?: APIGuildWelcomeScreen;
    /** If the guild is designated to nsfw */
    public nsfw: boolean;
    /** The name of the guild */
    public name: string;
    /** The icon hash */
    public icon: string;
    /** The splash hash of the guild */
    public splash: string;
    /** If the guild is unaivalable */
    public unavailable?: boolean;
    /** The id of the guild */
    public id: Snowflake;

    //Caches
    public emojis_cache: Collection<Snowflake, APIEmoji>;
    public channels_cache: Collection<Snowflake, APIChannel>;
    public members_cache: Collection<Snowflake, User>;

    constructor(private _client: Client, private _data: APIGuild){
        this.initData()
    }

    private initData(){
        this.icon_hash = this._data.icon_hash
        this.discovery_splash = this._data.discovery_splash
        this.owner = this._data.owner
        this.owner_id = this._data.owner_id
        this.permissions = this._data.permissions
        this.region = this._data.region
        this.afk_channel_id = this._data.afk_channel_id
        this.afk_timeout = this._data.afk_timeout
        this.widget_enabled = this._data.widget_enabled
        this.widget_channel_id = this._data.widget_channel_id
        this.verification_level = this._data.verification_level
        this.default_message_notifications = this._data.default_message_notifications
        this.explicit_content_filter = this._data.explicit_content_filter
        this.roles = this._data.roles
        this.emojis = this._data.emojis
        this.features = this._data.features
        this.mfa_level = this._data.mfa_level
        this.application_id = this._data.application_id
        this.system_channel_id = this._data.system_channel_id
        this.system_channel_flags = this._data.system_channel_flags
        this.rules_channel_id = this._data.rules_channel_id
        this.joined_at = this._data.joined_at
        this.large = this._data.large
        this.member_count = this._data.member_count
        this.voice_states = this._data.voice_states
        this.members = this._data.members
        this.channels = this._data.channels
        this.presences = this._data.presences
        this.max_presences = this._data.max_presences
        this.max_members = this._data.max_members
        this.vanity_url_code = this._data.vanity_url_code
        this.description = this._data.description
        this.banner = this._data.banner
        this.premium_tier = this._data.premium_tier
        this.premium_subscription_count = this._data.premium_subscription_count
        this.preferred_locale = this._data.preferred_locale
        this.public_updates_channel_id = this._data.public_updates_channel_id
        this.max_video_channel_users = this._data.max_video_channel_users
        this.approximate_member_count = this._data.approximate_member_count
        this.approximate_presence_count = this._data.approximate_presence_count
        this.welcome_screen = this._data.welcome_screen
        this.nsfw = this._data.nsfw
        this.name = this._data.name
        this.icon = this._data.icon
        this.splash = this._data.splash
        this.unavailable = this._data.unavailable
        this.id = this._data.id

        this.emojis_cache = new Collection<Snowflake, APIEmoji>()
        this.channels_cache = new Collection<Snowflake, APIChannel>()
        this.members_cache = new Collection<Snowflake, User>()
    }
}
