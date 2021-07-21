"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Gateway_1 = require("./gateway/Gateway");
const restAPI_1 = require("./rest/restAPI");
const RestError_1 = require("./rest/RestError");
const Utils_1 = require("./TUtils/Utils");
class Client {
    constructor(token, intents, clientsettings) {
        this.isABot = true;
        this.setAllToCache = false;
        this._token = 'Bot ' + token;
        this._restAPI = new restAPI_1.restAPI(this);
        this._gateway = new Gateway_1.Gateway(this);
        if (Utils_1.Utils.hasDuplicates(intents))
            throw new Error('Duplicates intents are not allowed.');
        var allIntents = 0;
        intents.forEach((i) => {
            allIntents += i;
        });
        this.intents = allIntents;
        if (clientsettings) {
            if (clientsettings.isABot) {
                this.isABot = clientsettings.isABot;
            }
            if (clientsettings.setAllToCache) {
                this.setAllToCache = clientsettings.setAllToCache;
            }
        }
    }
    get token() {
        return this._token;
    }
    get restAPI() {
        return this._restAPI;
    }
    connect() {
        this._restAPI.sendRequest('GET', '/gateway/bot').then((request) => {
            if (request instanceof RestError_1.RestError && request.code == 403)
                throw new Error('An invalid token was provided!');
            this._gateway.connect(request.url);
        });
    }
    setPresence(status, activities, since, afk) {
        var statusType;
        switch (status) {
            case 'online':
                statusType = "online" /* Online */;
                break;
            case 'offline':
                statusType = "offline" /* Offline */;
                break;
            case 'dnd':
                statusType = "dnd" /* DoNotDisturb */;
                break;
            case 'idle':
                statusType = "idle" /* Idle */;
                break;
            case 'invisible':
                statusType = "invisible" /* Invisible */;
                break;
        }
        if (!since)
            since = Date.now();
        if (!afk) {
            if (statusType == "idle" /* Idle */) {
                afk = true;
            }
            else {
                afk = false;
            }
        }
        var data = {
            since: since,
            status: statusType,
            afk: afk,
            activities: activities
        };
        return this.presence = data;
    }
}
exports.Client = Client;
