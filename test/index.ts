import {Client} from '../src/Client';
import * as Intents from '../src/Intents';
require('dotenv').config()

class test {
    async test(){
        const client = new Client(process.env.TOKEN, [Intents.GUILDS, Intents.GUILD_MESSAGES])

        client.connect()

        client.on('ready', async(ready) => {
            console.log('ready!')
            client.user.setActivity([{name: 'test', type: 0}])

            client.guilds.get('869219983509573662').channels_cache.get('869219983509573665').sendMessage('test')
        })
    }
}

var t = new test();
t.test();



