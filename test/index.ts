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
            client.user.setActivity([{name: 'test', type: 0}])
            console.log(client.guilds)
            console.log(client.guilds.fetch('869219983509573662'))
        })
    }
}

var t = new test();
t.test();



