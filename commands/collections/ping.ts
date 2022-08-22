import { Client, CommandInteraction } from "discord.js"

import { libraries } from "@assets/ts/libraries"

const ping = {
    name: "ping",
    execute: async (client: Client<boolean>, interaction: CommandInteraction) => {
        const latency = Date.now() - interaction.createdTimestamp
        const apiLatency = Math.round(client.ws.ping)
        const timestamp = libraries.prettyTime({
            time: new Date(interaction.createdTimestamp),
        })

        await interaction.deferReply()
        await interaction.followUp({
            embeds: [
                {
                    color: libraries.randomColor(),
                    title: `🏓Latency is ${latency}ms. API Latency is ${apiLatency}ms.`,
                    description: `Create at \`${timestamp}\``,
                },
            ],
            ephemeral: false,
        })
    },
}

export default ping
