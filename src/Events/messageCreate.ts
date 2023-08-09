import { FilterID, getUserRoles } from '../scripts';
import { Event } from '../Interfaces';
import { Channel, Message, OverwriteType, PermissionFlagsBits, PermissionOverwrites } from 'discord.js';
import Client from '../Client';

export const event: Event = {
    data: {
        name: 'messageCreate',
        description: 'Code to run when Message is sent'
    },
    run: async (client: Client, message: Message) => {

        if (message.author.bot || !message.content.startsWith(client.config.PREFIX)) return;

        const args = message.content.slice(client.config.PREFIX.length).trim().split(' ')
        const command = args.shift().toLowerCase();

        if (message.channel.isVoiceBased()) {
            var thisChannel = await message.guild.channels.fetch(message.channel.id);
            if (!thisChannel.name.toLowerCase().endsWith("room") && thisChannel.name.toLowerCase().endsWith("new room")) return;
            if (!thisChannel.name.startsWith(message.author.username) && !message.content.startsWith(client.config.PREFIX)) return;

            switch (command) {
                case "lock":
                    message.channel.permissionOverwrites.create(message.guild.roles.everyone, { Connect: false });
                    message.reply("Room has been locked. 🔒");
                    break;
                case "unlock":
                    message.channel.permissionOverwrites.create(message.guild.roles.everyone, { Connect: true });
                    message.reply("Room has been unlocked. 🔓");
                    break;
                case "status":
                    if (message.channel.permissionsFor(message.guild.roles.everyone).toArray().includes("Connect")) {
                        message.reply("The Channel is currently unlocked. 🔓")
                    } else {
                        message.reply("The Channel is currently locked. 🔒")
                    }
                    break;
                case "invite":
                    if (!args) {
                        message.reply("You must specify whom you'd like to invite.");
                        return;
                    };
                    var invitee = FilterID(args[0], client)
                    if (invitee == "Invalid Input") message.reply(invitee);
                    else {
                        message.channel.permissionOverwrites.create(invitee, { Connect: true });
                        message.reply(`Successfully Invited <@${invitee}> to your room.`);
                    }
                    break;
                case "kick":
                    if (!args) {
                        message.reply("You must specify whom you'd like to kick.");
                        return;
                    };
                    var invitee = FilterID(args[0], client)
                    if (invitee == "Invalid Input") message.reply(invitee);
                    else {
                        message.channel.permissionOverwrites.create(invitee, { Connect: false });
                        message.reply(`Successfully Kicked <@${invitee}> to your room.`);
                    }
                    break;
            }

        }

        if (message.author.id == "471172695862542337") {
            switch (command) {
                case "deploy":
                    var res = await message.reply("Deploying Application (/) Commands!");
                    (await require("../deploy.ts")).init(client.user.id, message.guild.id, res);
                    break;
            }
        }
        if (await getUserRoles(message, "ManageGuild")) {
            switch (command) {
                case "bugfix":
                    if (!args) message.reply(`Usage: ${client.config.PREFIX}bugfix <userid, ping, name> <number of bugs fixed>`)
                    else {
                        // Nothing here yet!
                    }
                    break;
            }
        }
    }
}