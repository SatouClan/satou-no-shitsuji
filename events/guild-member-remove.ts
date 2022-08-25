import { GuildMember, PartialGuildMember } from "discord.js"

import dym from "@constants/dym"
import { ClientEvent } from "@events"

export default {
    name: "guildMemberRemove",
    execute: async (client, member: GuildMember | PartialGuildMember) => {
        let id = member.id
        let goodbyeMsg = dym.goodbyeMsgTemplate.replace("$MENTION$", `<@${id}>`)
        await member.guild.systemChannel?.send(goodbyeMsg)
    },
} as ClientEvent<"guildMemberRemove">
