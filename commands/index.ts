import { CacheType, Client, Interaction } from "discord.js" /** discord classes */

/** commands */
import ping from "./collections/ping"
import calc from "./collections/calc"
import baserole from "./collections/baserole"

/** deploy */
import register from "./register"

/** main function */
export default function init_commands(client: Client<true>): void {
    /** register commands */
    register()

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

                case baserole.name:
                    await baserole.execute(client, interaction)
                    break

                default:
                    break
            }
        } catch (e) {
            await interaction.reply({
                content: "Oops, an error occurred 🤔",
                ephemeral: true,
            })
        }
    })
}
