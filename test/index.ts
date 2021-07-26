import * as ActivityTypes from '../src/Data/ActivityTypes';
import {Client} from '../src/Client';
import * as Intents from '../src/Intents';
import { User } from '../src/structures/User';
require('dotenv').config()

class test {
    async test(){
        const client = new Client(process.env.TOKEN, [Intents.GUILDS, Intents.GUILD_MESSAGES])

        client.connect()

        client.on('ready', (ready) => {
            console.log('ready!')
            client.user.setPresence('dnd', [{name: "test", type: 0}])
        })
        var r = await client.restAPI.sendRequest('get', `/users/691618793696264194`);
        var u = new User(client, r);
        console.log(u.getAvatarUrl());
    }
}

var t = new test();
t.test();



