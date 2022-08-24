import { CacheType, Interaction } from "discord.js"

import { ClientEvent } from "@events"
import { SlashCommand, list } from "./commands/data"
import { join } from "path"

const commands = list.map(async (item) => {
    const commandPath = join(__dirname, "commands", "collection")

    return (await import(join(commandPath, item.name))).default as Promise<SlashCommand>
})

export default {
    name: "interactionCreate",
    execute(client, interaction: Interaction<CacheType>) {
        if (!interaction.isCommand()) return

        try {
            commands.forEach(async (cmd) => {
                const command = await cmd
                if (command.name !== interaction.commandName) return
                command.execute(client, interaction)
            })
        } catch (e) {
            interaction.reply({
                content: "Oops, an error occurred 🤔",
                ephemeral: true,
            })
        }
    },
} as ClientEvent
