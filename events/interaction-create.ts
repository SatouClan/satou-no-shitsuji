import { Interaction } from "discord.js"

import { ClientEvent } from "@events"
import { Command, list } from "./commands/data"
import { join } from "path"

const commands = list.map(async (item) => {
    const commandPath = join(__dirname, "commands", "collection")

    return (await import(join(commandPath, item.name))).default as Promise<Command>
})

export default {
    name: "interactionCreate",
    async execute(client, interaction: Interaction) {
        try {
            commands.forEach(async (cmd) => {
                const command = await cmd

                if (
                    interaction.isSelectMenu() ||
                    interaction.isButton() ||
                    interaction.isModalSubmit()
                ) {
                    if (command.name !== interaction.message?.interaction?.commandName)
                        return
                    return command.execute(client, interaction)
                }

                if (interaction.commandName === command.name)
                    return command.execute(client, interaction)
            })
        } catch (e) {
            if (interaction.isAutocomplete()) return

            await interaction.reply({
                content: "Oops, an error occurred 🤔",
                ephemeral: true,
            })
        }
    },
} as ClientEvent<"interactionCreate">
