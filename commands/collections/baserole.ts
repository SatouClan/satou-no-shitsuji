import { Client, CommandInteraction } from "discord.js"

import dym from "@constants/dym"

export default {
    name: "baserole",
    execute: async (client: Client<true>, interaction: CommandInteraction) => {
        if (interaction.guildId === null || interaction.guild === null) return

        const author = await interaction.guild.members.fetch(interaction.user.id)

        /** if author is not valid */
        if (!author.roles.cache.some((role) => role.permissions.has("ManageRoles"))) {
            interaction.reply({
                content: "Heheh, you can not do that 😅",
                ephemeral: true,
            })

            return
        }

        /** if author is valid */
        const roleId = interaction.options.get("role", true)
        dym.baseRoleId[interaction.guildId] = roleId.value as string

        await interaction.reply({
            embeds: [
                {
                    author: {
                        name: `${client.user.username}#${client.user.discriminator}`,
                        icon_url: client.user.avatarURL() ?? "",
                    },
                    description: `Set the base role to <@&${
                        dym.baseRoleId[interaction.guildId]
                    }>`,
                },
            ],
            ephemeral: true,
        })
    },
}
