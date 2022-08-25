import { Message } from "discord.js"

import EXPRESSION_MAP from "@constants/expression"
import HELP from "@constants/help"
import { ClientEvent } from "@events"

export default {
    name: "messageCreate",

    async execute(client, message) {
        if (message.author.id === client.user.id) return

        /** */
        const { content } = message

        /** random reply */
        await this.send(message, content)

        /** on mention */
        if (
            message.mentions.has(client.user.id) &&
            message.author.id !== client.user.id &&
            message.mentions.users.size === 1
        )
            await message.channel.send({ embeds: [HELP] })
    },

    send: async (message: Message<boolean>, content: string) => {
        for (const exp in EXPRESSION_MAP)
            if (content.toLowerCase().includes(exp)) {
                await message.channel.send(EXPRESSION_MAP[exp])
                break
            }
    },
} as ClientEvent<"messageCreate">
