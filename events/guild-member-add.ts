import { GuildMember } from "discord.js"

import { ClientEvent } from "@events"
import dym from "@constants/dym"

export default {
    name: "guildMemberAdd",
    execute: async (client, guildMember: GuildMember) => {
        /** set base role if exists */
        const target: "user" | "bot" = guildMember.user.bot ? "bot" : "user"
        if (dym[`${target}BaseroleId`][guildMember.guild.id])
            guildMember.roles.add(dym[`${target}BaseroleId`][guildMember.guild.id])

        /** welcome message */
        let welcomeMsg = dym.welcomeMsgTemplate
            .replace("$MENTION$", `<@${guildMember.id}>`)
            .replace("$SERVER$", guildMember.guild.name)
            .replace("$RULES$", `<#${guildMember.guild.rulesChannelId}>`)

        await guildMember.guild.systemChannel?.send(welcomeMsg)
    },
} as ClientEvent
