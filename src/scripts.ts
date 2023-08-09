import { EmbedBuilder, Guild, GuildMember, Message, PermissionFlags, PermissionResolvable } from "discord.js";
import { MyEmbeds, RequiredEmbed } from './types';
import Client from './Client'
import { EmbedContent } from "./Interfaces";
import ExtendedClient from "./Client";

function getEmbedContent(type: MyEmbeds, requiredEmbed?: RequiredEmbed) {
    var Content: EmbedContent[] = require(`./Content/${type}.json`).EMBEDS;
    var embedContent = Content.filter(c => c.NAME === requiredEmbed);
    return embedContent[0].DATA;
}

export async function getUserRoles(message: Message, Permission: PermissionResolvable): Promise<boolean> {
    return await message.guild.members.fetch(message.author.id).then((u: GuildMember) => {
        if (u.id === "471172695862542337") return true;
        else return u.permissions.has(Permission);
    });
}

export function EmbedConstructor(type: MyEmbeds, client: Client, requiredEmbed?: RequiredEmbed) {

    var { TITLE, DESCRIPTION } = getEmbedContent(type, requiredEmbed);
    return new EmbedBuilder()
        .setTitle(TITLE)
        .setDescription(DESCRIPTION)
        .setFooter({ text: "Backwards Development", iconURL: client.user.avatarURL() })
        .setColor(`Aqua`)
}

export function FilterID(message: string, client: ExtendedClient): string {
    if (message.match(/[A-Z]*[a-z]/gi)) {
        return "Invalid Input";
    } else if (message.match(/[<@>]/gi)) {
        return message.split(/[<@>]/gi).join("");
    } else if (message.match(/[0-9]/gi)) {
        return message;
    } else {
        return "Invalid Input";
    }
}