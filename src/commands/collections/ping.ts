import { Client, CommandInteraction } from 'discord.js'

import messages from './../../constants/messages'
import { randomColor } from './../../utilities'


const ping = {
    name: 'ping',
    execute: async (
        client: Client<boolean>,
        interaction: CommandInteraction
    ) => {
        const latency = Math.abs(Math.round(Date.now() - interaction.createdTimestamp))
        const apiLatency = Math.round(client.ws.ping)

        await interaction.deferReply()
        await interaction.followUp({
            embeds: [
                {
                    color: randomColor(),
                    title: `${messages.ping} - Latency: ${latency}ms - API Latency: ${apiLatency}ms`,
                }
            ],
            ephemeral: false
        })
    }
}


export default ping
