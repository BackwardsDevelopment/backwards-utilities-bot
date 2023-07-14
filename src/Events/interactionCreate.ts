import { HandleChatInputCommand } from '../Interaction Handlers';
import { Interaction } from "discord.js";
import { Event } from "../Interfaces";
import Client from '../Client';

export const event: Event = {
    data: {
        name: "interactionCreate"
    },
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isChatInputCommand()) HandleChatInputCommand(client, interaction);
    }
}