import { Awaitable, Client, ClientEvents } from "discord.js"
import { readdirSync } from "fs"
import path from "path"

import register from "./commands/register"

export interface ClientEvent {
    once?: boolean
    name: keyof ClientEvents
    execute: (
        client: Client<true>,
        ...args: ClientEvents[this["name"]]
    ) => Awaitable<void>
    [key: string]: any
}

export default async function init_events(client: Client<true>) {
    await register()

    const eventPath = __dirname
    const eventFiles = readdirSync(eventPath).filter(
        (file) => file.endsWith(".ts") && !file.startsWith("index")
    )

    for (const file of eventFiles) {
        const filePath = path.join(eventPath, file.slice(0, -3))
        const event: ClientEvent = (await import(filePath)).default

        client[event.once ? "once" : "on"](
            event.name,
            async function (...args): Promise<void> {
                await event.execute(client, ...args)
            }
        )

        console.log(`> Successfully registered ${file.replace(".ts", "")} event`)
    }
}
