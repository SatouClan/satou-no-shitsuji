import { Client, CommandInteraction, GuildMemberRoleManager } from "discord.js"

import dym from "@constants/dym"
import { createTimestamp } from "@constants/config"

export default {
    name: "baserole",

    async execute(client: Client<true>, interaction: CommandInteraction) {
        if (
            !interaction.member ||
            !interaction.memberPermissions?.has("ManageRoles") ||
            interaction.guild === null
        )
            return this.refused(interaction)

        const baseRoleId = interaction.options.get("role", true).value as string
        const baseRole = await interaction.guild.roles.fetch(baseRoleId)
        const memberRole = interaction.member.roles as GuildMemberRoleManager

        if (baseRole === null)
            return this.error(interaction, `Base role doesn't exist 🤔`)

        if (memberRole.highest.position < baseRole.position)
            return this.error(
                interaction,
                `You can't set base role with a role that is higher than you or too high 😿`
            )

        dym.baseRoleId[interaction.guildId ?? ""] = baseRoleId

        return this.accepted(client, interaction)
    },

    async error(interaction: CommandInteraction, content: string) {
        return interaction.reply({ content, ephemeral: true })
    },

   async  refused (interaction: CommandInteraction) {
        return interaction.reply({
            content: "Heheh, you can not do that 😅",
            ephemeral: true,
        })
    },

    async accepted(client: Client<true>, interaction: CommandInteraction) {
        return interaction.reply({
            embeds: [
                {
                    author: {
                        name: `${client.user.username}#${client.user.discriminator}`,
                        icon_url: client.user.avatarURL() ?? "",
                    },
                    description: `Set the base role to <@&${
                        dym.baseRoleId[interaction.guildId ?? ""]
                    }>`,
                    footer: {
                        text: `Created at ${createTimestamp(interaction)}`,
                    },
                },
            ],
            ephemeral: true,
        })
    },
}
