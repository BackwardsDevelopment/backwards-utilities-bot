import { EmbedBuilder, GuildMember, Message } from "discord.js";
import { MyEmbeds, RequiredEmbed } from './types';
import Client from './Client'
import { EmbedContent } from "./Interfaces";

function getEmbedContent(type: MyEmbeds, requiredEmbed?: RequiredEmbed) {
    var Content: EmbedContent[] = require(`./Content/${type}.json`).EMBEDS;
    var embedContent = Content.filter(c => c.NAME === requiredEmbed);
    return embedContent[0].DATA;
}

export async function getUserRoles(message: Message): Promise<boolean> {
    return await message.guild.members.fetch(message.author.id).then((u: GuildMember) => {
        return u.permissions.has("ManageGuild");
    });
}

export function EmbedConstructor(type: MyEmbeds, client: Client, requiredEmbed?: RequiredEmbed) {
    
    var { TITLE, DESCRIPTION } = getEmbedContent(type, requiredEmbed);
    return new EmbedBuilder()
        .setTitle(TITLE)
        .setDescription(DESCRIPTION)
        .setFooter({text: "Backwards Development", iconURL: client.user.avatarURL()})
        .setColor(`Aqua`)
}