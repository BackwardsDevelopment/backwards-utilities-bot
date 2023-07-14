import { CommandInteraction } from 'discord.js';
import Client from '../Client';

export function HandleChatInputCommand(client: Client, interaction: CommandInteraction) {

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        throw new Error(`No command matching ${interaction.commandName} was found.`);
    }

    try {
        command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
        }
    }

}