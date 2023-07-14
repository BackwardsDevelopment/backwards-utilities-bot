import Client from '../Client'
import { ClientEvents, Events } from 'discord.js'

console.log(Events)

interface Data {
    name: keyof ClientEvents
    description?: string
}

interface Run {
    (client: Client, ...args: any[]): void
}

export interface Event {
    data: Data
    run: Run
}