import { APIEmbed, CommandInteraction, JSONEncodable } from "discord.js"
import { evaluate } from "mathjs"

import { libraries } from "@assets/ts/libraries"
import { createTimestamp } from "@constants/config"

const calc = {
    name: "calc",
    execute: async function (interaction: CommandInteraction) {
        /** filter the options array */
        const math: string = interaction.options.get("math", true).value as string

        /** reply */
        const reply: APIEmbed | JSONEncodable<APIEmbed> = {
            color: libraries.randomColor(),
            title: "Playing math",
            author: {
                name: `${interaction.user.username}#${interaction.user.discriminator}`,
                icon_url: interaction.user.avatarURL() ?? "",
                url: interaction.user.avatarURL() ?? "",
            },
            description: `The result for \`${math}\` is : \`${evaluate(math)}\``,
            footer: {
                text: `Created at ${createTimestamp(interaction)}`,
            },
        }

        await interaction.deferReply()
        await interaction.followUp({ embeds: [reply] })
    },
}

export default calc
