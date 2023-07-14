import { Command, Config, Event } from '../Interfaces';
import { ActivityType, Client, Collection } from 'discord.js';
import ConfigJson from '../config.secret.json';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = ConfigJson;

    public async init() {
        this.login(this.config.TOKEN);

        /* Commands */
        const commandPath = join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir: string) => {
            const commands = readdirSync(`${commandPath}\\${dir}`).filter(file => file.endsWith('.ts'));
            for (const file of commands) {
                const { command } = require(`${commandPath}\\${dir}\\${file}`);
                this.commands.set(command.data.name, command);
            }
        })

        /* Events */
        const eventPath = join(__dirname, "..", "Events");
        readdirSync(eventPath).forEach(async (file: string) => {
            const { event } = await import(`${eventPath}\\${file}`);
            this.events.set(event.data.name, event);
            this.on(event.data.name, event.run.bind(null, this));
        });

        process.once("beforeExit", () => {
            if (this && this.user) {
                this.user.setPresence({
                    status: "invisible"
                });
            }
        });
    }
}

export default ExtendedClient;