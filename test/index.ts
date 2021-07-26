import * as ActivityTypes from '../src/Data/ActivityTypes';
import {Client} from '../src/Client';
import * as Intents from '../src/Intents';
import { User } from '../src/structures/User';
require('dotenv').config()

class test {
    async test(){
        const client = new Client(process.env.TOKEN, [Intents.GUILDS, Intents.GUILD_MESSAGES])

        client.connect()

        client.on('ready', async(ready) => {
            console.log('ready!')
            client.user.setActivity([{name: 'test', type: 0}])
            console.log(client.guilds)
            console.log(await client.fetchUser('691618793696264194'))
            console.log(client.users)
        })
    }
}

var t = new test();
t.test();



