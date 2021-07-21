"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class User extends Base_1.Base {
    construtor(client, api) {
        super(client);
        this._api = api;
    }
}
exports.User = User;
