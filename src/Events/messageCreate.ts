import { getUserRoles } from '../scripts';
import { Event } from '../Interfaces';
import { Message } from 'discord.js';
import Client from '../Client';

export const event: Event = {
    data: {
        name: 'messageCreate',
        description: 'Code to run when Message is sent'
    },
    run: async (client: Client, message: Message) => {

        if (message.author.bot && !message.content.startsWith(client.config.PREFIX)) return;

        const args = message.content.slice(client.config.PREFIX.length).trim().split(' ')
        const command = args.shift().toLowerCase();

        if (message.author.id == "471172695862542337") {
            switch (command) {
                case "deploy":
                    var res = await message.reply("Deploying Application (/) Commands!");
                    (await require("../deploy.ts")).init(client.user.id, message.guild.id, res);
                    break;
            }
        } else if (await getUserRoles(message)) {
            switch (command) {
                case "bugfix":
                    if (!args) message.reply(`Usage: ${client.config.PREFIX}bugfix <userid, ping, name> <number of bugs fixed>`)
                    else {
                        // Nothing here yet!
                    }
            }
        }
    }
}