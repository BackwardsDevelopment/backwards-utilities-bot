import { ActivityType } from 'discord.js'
import { Event } from '../Interfaces';

export const event: Event = {
    data: {
        name: 'ready',
        description: "Code to run when bot is started."
    },
    run: (client) => {
        console.log(`Successfully Logged in as ${client.user?.tag}!`);
        client.user?.setActivity({
            type: ActivityType.Listening,
            name: "/help"
        });
    }
}