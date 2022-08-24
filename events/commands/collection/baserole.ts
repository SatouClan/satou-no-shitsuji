import { Client, CommandInteraction, GuildMemberRoleManager } from "discord.js"

import dym from "@constants/dym"
import { createTimestamp } from "@constants/config"
import { SlashCommand } from "../data"

export default {
    name: "baserole",

    async execute(client: Client<true>, interaction: CommandInteraction<"cached">) {
        if (
            !interaction.member ||
            !interaction.memberPermissions?.has("ManageRoles") ||
            interaction.guild === null
        )
            return this.refused(interaction)

        const baseroleId = interaction.options.get("role", true).value as string
        const baseRole = await interaction.guild.roles.fetch(baseroleId)
        const memberRole = interaction.member.roles
        const clientRole = (await interaction.guild.members.fetch(client.user.id)).roles

        if (baseRole === null)
            return this.error(interaction, `Base role doesn't exist 🤔`)

        if (memberRole.highest.position < baseRole.position)
            return this.error(
                interaction,
                `You can't set base role with a role that is higher than you or too high 😿`
            )

        if (clientRole.highest.position <= baseRole.position)
            return this.error(interaction, `Base role is too high for me to set 😿`)

        let target: "user" | "bot" = interaction.options.data.every(
            (o) => o.name === "user"
        )
            ? "user"
            : "bot"
        dym[`${target}BaseroleId`][interaction.guildId ?? ""] = baseroleId

        return this.accepted(client, interaction)
    },

    async error(interaction: CommandInteraction, content: string) {
        return interaction.reply({ content, ephemeral: true })
    },

    async refused(interaction: CommandInteraction) {
        return interaction.reply({
            content: "Heheh, you can not do that 😅",
            ephemeral: true,
        })
    },

    async accepted(client: Client<true>, interaction: CommandInteraction) {
        let target: "user" | "bot" = interaction.options.data.every(
            (o) => o.name === "user"
        )
            ? "user"
            : "bot"
        let roleId = dym[`${target}BaseroleId`][interaction.guildId ?? ""]

        return interaction.reply({
            embeds: [
                {
                    author: {
                        name: `${client.user.username}#${client.user.discriminator}`,
                        icon_url: client.user.avatarURL() ?? "",
                    },
                    description: `Set the ${target}'s base role to <@&${roleId}>`,
                    footer: {
                        text: `Created at ${createTimestamp(interaction)}`,
                    },
                },
            ],
            ephemeral: true,
        })
    },
} as SlashCommand
