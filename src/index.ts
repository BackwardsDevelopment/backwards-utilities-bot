import { GatewayIntentBits } from 'discord.js';
import Client from './Client';

var intents: GatewayIntentBits[] = [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds
]

new Client({ intents: intents })
.init();