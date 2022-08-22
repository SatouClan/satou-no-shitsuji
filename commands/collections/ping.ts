import { Client, CommandInteraction } from "discord.js"

import { NAME, DISCRIMINATOR } from "@constants/config"
import { libraries } from "@assets/ts/libraries"

const ping = {
    name: "ping",
    execute: async (client: Client<true>, interaction: CommandInteraction) => {
        const latency = Date.now() - interaction.createdTimestamp
        const apiLatency = Math.round(client.ws.ping)
        const timestamp = libraries.prettyTime({
            timestamp: new Date(interaction.createdTimestamp),
        })

        await interaction.deferReply()
        await interaction.followUp({
            embeds: [
                {
                    color: libraries.randomColor(),
                    title: "Pong 🏓",
                    author: {
                        name: `${NAME}#${DISCRIMINATOR}`,
                        icon_url: client.user.avatarURL() ?? "",
                        url: client.user.avatarURL() ?? "",
                    },
                    description: [
                        `\`\`\`elm`,
                        `Latency     : ${latency}ms`,
                        `API Latency : ${apiLatency}ms`,
                        `\`\`\``,
                    ].join("\n"),
                    footer: {
                        text: `Created at ${timestamp}`,
                    },
                },
            ],
            ephemeral: false,
        })
    },
}

export default ping
