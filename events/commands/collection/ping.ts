import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    Client,
} from "discord.js"

import { createTimestamp } from "@constants/utilities"
import { libraries } from "@assets/ts/libraries"
import { Command } from "../data"

async function isButtonHandler(
    client: Client<true>,
    interaction: ButtonInteraction
) {
    const latency = Date.now() - interaction.createdTimestamp
    const apiLatency = Math.round(client.ws.ping)

    await interaction.deferReply()
    await interaction.followUp({
        embeds: [
            {
                color: libraries.randomColor(),
                title: "Pong 🏓",
                author: {
                    name: client.user.tag,
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
}

async function isChatInputCommandHandler(
    interaction: ChatInputCommandInteraction
) {
    await interaction.reply({
        components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId("health-check")
                    .setLabel("Check my health")
                    .setStyle(ButtonStyle.Primary)
            ),
        ],
    })
}

export default {
    name: "ping",

    async execute(
        client: Client<true>,
        interaction: ChatInputCommandInteraction | ButtonInteraction
    ) {
        if (interaction.isChatInputCommand())
            return isChatInputCommandHandler(interaction)

        return isButtonHandler(client, interaction)
    },
} as Command
