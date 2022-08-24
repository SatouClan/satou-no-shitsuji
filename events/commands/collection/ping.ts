import { Client, CommandInteraction } from "discord.js"

import { NAME, DISCRIMINATOR, createTimestamp } from "@constants/config"
import { libraries } from "@assets/ts/libraries"
import { SlashCommand } from "../data"

const ping = {
    name: "ping",
    execute: async (client: Client<true>, interaction: CommandInteraction) => {
        const latency = Date.now() - interaction.createdTimestamp
        const apiLatency = Math.round(client.ws.ping)

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
                        text: `Created at ${createTimestamp(interaction)}`,
                    },
                },
            ],
            ephemeral: false,
        })
    },
} as SlashCommand

export default ping
