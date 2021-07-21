"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class User extends Base_1.Base {
    constructor(client, api) {
        super(client);
        this.initData(api);
    }
    initData(api) {
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
    getAvatarUrl() {
        return this.avatar;
    }
    isABot() {
        if (this.bot !== undefined)
            return this.bot;
        return false;
    }
}
exports.User = User;
