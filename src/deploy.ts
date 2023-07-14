import { Message, REST, Routes } from 'discord.js';
import { TOKEN } from './config.secret.json';
import * as fs from 'node:fs';
import * as path from 'node:path';

export function init(clientId: string, guildId: string, res: Message) {
	const commands: any[] = [];
	// Grab all the command files from the commands directory you created earlier
	const foldersPath: string = path.join(__dirname, 'commands');
	const commandFolders: string[] = fs.readdirSync(foldersPath);
	for (const folder of commandFolders) {
		// Grab all the command files from the commands directory you created earlier
		const commandsPath: string = path.join(foldersPath, folder);
		const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const filePath: string = path.join(commandsPath, file);
			const { command } = require(filePath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	// Construct and prepare an instance of the REST module
	const rest: any = new REST().setToken(TOKEN);

	// and deploy your commands!
	(async () => {
		try {
			res.edit(`Started refreshing ${commands.length} application (/) commands.`);
			// The put method is used to fully refresh all commands in the guild with the current set
			const data: any = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);

			res.edit(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
			res.edit("Something went wrong while deploying application (/) commands.")
		}
	})();

}