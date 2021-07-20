import { PresenceUpdateStatus } from 'discord-api-types';
import {Client} from '../src/Client';
import * as Intents from '../src/Intents';

const client = new Client('', [Intents.GUILDS, Intents.GUILD_MESSAGES])

client.setPresence('dnd', [{name: "Test", type: 0}])

client.connect()
