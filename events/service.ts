import { Client } from "discord.js"

import dym from "@constants/dym"

export default function init_service(client: Client<true>) {
    client.on("guildMemberAdd", (guildMember) => {
        /** base role implementation */
        if (dym.baseRoleId) guildMember.roles.add(dym.baseRoleId[guildMember.guild.id])

        /** welcome message */
        let welcomeMsg = dym.welcomeMsgTemplate
            .replace("$MENTION$", `<@${guildMember.id}>`)
            .replace("$SERVER$", guildMember.guild.name)
            .replace("$RULES$", `<#${guildMember.guild.rulesChannelId}>`)

        guildMember.guild.systemChannel?.send(welcomeMsg)
    })

    client.on("guildMemberRemove", (member) => {
        let id = member.id
        let goodbyeMsg = dym.goodbyeMsgTemplate.replace("$MENTION$", `<@${id}>`)
        member.guild.systemChannel?.send(goodbyeMsg)
    })

    /** logger */
    console.log("> Successfully initialized service messages")
}
