import { PresenceUpdateStatus } from 'discord-api-types';
import {Client} from '../src/Client';

const client = new Client('token', [])

client.setPresence({
    since: Date.now(),
    activities: [{
        name: "Test",
        type: 0,
    }],
    status: PresenceUpdateStatus.Online,
    afk: false
})

client.connect()
