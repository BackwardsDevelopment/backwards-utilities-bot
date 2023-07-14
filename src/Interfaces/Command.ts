import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import Client from "../Client";

interface Run {
    (client: Client, interaction: CommandInteraction): void
}

export interface Command {
    data: any
    execute: Run
}