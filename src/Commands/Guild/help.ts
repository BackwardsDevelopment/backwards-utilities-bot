import { SlashCommandBuilder, CommandInteraction, Embed } from "discord.js";
import { EmbedConstructor } from '../../scripts';
import { Command } from "../../Interfaces";
import Client from '../../Client';

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends an embeded help page with commands, tips and more!')
        .addUserOption(opt =>
            opt.setName("bothelp")
            .setDescription("The bot you wish help for."),
        ),
    async execute(client: Client, interaction: CommandInteraction) {
        switch(interaction.options.data[0].user.id) {
            case "471172695862542337":
                await interaction.reply({ ephemeral: true, embeds: [EmbedConstructor("Help", client, "BACKWARDS")] });
                break;
            case "865797535372673074":
                await interaction.reply({ ephemeral: true, embeds: [EmbedConstructor("Help", client, "MUSICBOT")] });
                break;
            default:
                await interaction.reply({ ephemeral: true, embeds: [EmbedConstructor("Help", client, "DEFAULT")] });
                break;
        }
    }
}