"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../src/Client");
const ActivityTypes = require("../src/Data/ActivityTypes");
const Intents = require("../src/Intents");
const User_1 = require("../src/structures/User");
class test {
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new Client_1.Client('NzQ4ODgyMTE3MjU3MzMwNzE5.X0j40g.-rZtiR56fYbhrhzENrub60LCM9I', [Intents.GUILDS, Intents.GUILD_MESSAGES]);
            client.setPresence('dnd', [{ name: "Test", type: ActivityTypes.PLAYING }]);
            client.connect();
            var r = yield client.restAPI.sendRequest('get', `/users/691618793696264194`);
            var u = new User_1.User(client, r);
            console.log(u.username);
        });
    }
}
var t = new test();
t.test();
