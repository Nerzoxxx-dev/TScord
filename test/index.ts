import { APIUser, PresenceUpdateStatus } from 'discord-api-types';
import {Client} from '../src/Client';
import * as ActivityTypes from '../src/Data/ActivityTypes';
import * as Intents from '../src/Intents';
import { User } from '../src/structures/User';

class test {
    async test(){
        const client = new Client('', [Intents.GUILDS, Intents.GUILD_MESSAGES])

        client.setPresence('dnd', [{name: "Test", type: ActivityTypes.PLAYING}])

        client.connect()
        var r = await client.restAPI.sendRequest('get', `/users/691618793696264194`);
        var u = new User(client, r);
        console.log(u.username);
    }
}

var t = new test();
t.test();



