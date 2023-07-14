import { EmbedBuilder, GuildMember, Message } from "discord.js";
import { MyEmbeds } from './types';
import Client from './Client'

function getEmbedContent(type: MyEmbeds) {
    return require(`./Content/${type}.json`);
}

export async function getUserRoles(message: Message): Promise<boolean> {
    return await message.guild.members.fetch(message.author.id).then((u: GuildMember) => {
        return u.permissions.has("ManageGuild");
    });
}

export function EmbedConstructor(type: MyEmbeds, client: Client) {
    var { TITLE, DESCRIPTION } = getEmbedContent(type);
    return new EmbedBuilder()
        .setTitle(TITLE)
        .setDescription(DESCRIPTION)
        .setFooter({text: "Backwards Development", iconURL: client.user.avatarURL()})
        .setColor(`Aqua`)
}