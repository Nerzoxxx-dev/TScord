export const REST_VERSION = '9';
export const REST_BASE_URL = 'https://discord.com/api/v' + REST_VERSION;
export const GATEWAY_BASE_URL = "wss://gateway.discord.gg";
export const GATEWAY_VERSION = '9';
export const GATEWAY_ENCODING = 'json';
export const CDN_URL = "https://cdn.discordapp.com";
export const GATEWAY_GET_URL = "/gateway/bot";

export const GUILDS = "/guilds";
export const CLIENT_USER = "/users/@me"

export const AVATAR_URL = (user_id, user_avatar) => `${CDN_URL}/avatars/${user_id}/${user_avatar}.png`