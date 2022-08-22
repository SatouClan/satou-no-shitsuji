import { CacheType, Client, Interaction } from "discord.js" /** discord classes */

/** messages */
import EXPRESSION_MAP from "./messages/expression"

/** commands */
import ping from "./collections/ping"
import calc from "./collections/calc"

/** deploy */
import deploy from "./deploy"

/** main function */
export function run(client: Client<boolean>): void {
    deploy() /** register commands */

    /** on interaction */
    client.on("interactionCreate", async function (interaction: Interaction<CacheType>) {
        if (!interaction.isCommand()) return

        try {
            switch (interaction.commandName) {
                case ping.name:
                    await ping.execute(client, interaction)
                    break

                case calc.name:
                    await calc.execute(interaction)
                    break

                default:
                    break
            }
        } catch (e) {
            await interaction.reply("error")
        }
    })

    /** on message */
    client.on("messageCreate", async function (message) {
        const { content } = message

        /** goodbye and welcome messages */
        if (message.author.id !== client.user?.id) {
            if (content.toLowerCase().startsWith("welcome to our family"))
                await message.channel.send(
                    "Welcome to our family. Please, enjoy freely with in restriction."
                )

            if (content.toLowerCase().startsWith("see you"))
                await message.channel.send("See you.")

            for (const exp in EXPRESSION_MAP)
                if (content.toLowerCase().includes(exp)) {
                    await message.channel.send(EXPRESSION_MAP[exp])
                    break
                }
        }

        /** on mention */
        if (message.mentions.has(client.user?.id!))
            await message.channel.send("Available.")
    })
}
