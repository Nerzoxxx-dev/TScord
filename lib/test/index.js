"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../src/Client");
const ActivityTypes = require("../src/Data/ActivityTypes");
const Intents = require("../src/Intents");
const client = new Client_1.Client('NzQ4ODgyMTE3MjU3MzMwNzE5.X0j40g.-rZtiR56fYbhrhzENrub60LCM9I', [Intents.GUILDS, Intents.GUILD_MESSAGES]);
client.setPresence('dnd', [{ name: "Test", type: ActivityTypes.PLAYING }]);
client.connect();
