import { SlashCommandBuilder, CommandInteraction, Embed } from "discord.js";
import { EmbedConstructor } from '../../scripts';
import { Command } from "../../Interfaces";
import Client from '../../Client';

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends an embeded help page with commands, tips and more!'),
    async execute(client: Client, interaction: CommandInteraction) {
        console.log("Hello")
        await interaction.reply({ ephemeral: true, embeds: [EmbedConstructor("Help", client)] })
    }
}