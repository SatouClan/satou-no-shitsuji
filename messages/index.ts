import { Client, Message } from "discord.js" /** discord classes */

/** constants */
import EXPRESSION_MAP from "@constants/expression"
import HELP from "@constants/help"

async function sendMessage(message: Message<boolean>, content: string): Promise<void> {
    for (const exp in EXPRESSION_MAP)
        if (content.toLowerCase().includes(exp)) {
            await message.channel.send(EXPRESSION_MAP[exp])
            break
        }
}

export default function init_messages(client: Client<true>): void {
    client.on("messageCreate", async (message) => {
        if (message.author.id === client.user.id) return

        /** */
        /** content */
        const { content } = message

        /** */
        /** send message to user */
        sendMessage(message, content)

        /** */
        /** on mention */
        if (message.mentions.has(client.user.id) && message.author.id !== client.user.id)
            await message.channel.send({ embeds: [HELP] })
    })

    console.log("> Successfully initialized reply messages")
}
