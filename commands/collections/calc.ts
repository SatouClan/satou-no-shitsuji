import { CommandInteraction } from "discord.js"
import { evaluate } from "mathjs"

import { libraries } from "@assets/ts/libraries"

const calc = {
    name: "calc",
    execute: async function (interaction: CommandInteraction) {
        /** filter the options array */
        const math: string = interaction.options.get("math")?.value as string

        /** reply */
        const reply = {
            color: libraries.randomColor(),
            title: "Playing math",
            author: {
                name: `${interaction.user.username}#${interaction.user.discriminator}`,
                icon_url: interaction.user.avatarURL()!,
                url: interaction.user.avatarURL()!,
            },
            description: `The result for \`${math}\` is : \`${evaluate(math)}\``,
        }

        await interaction.deferReply()
        await interaction.followUp({ embeds: [reply] })
    },
}

export default calc
