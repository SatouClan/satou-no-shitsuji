import { Canvas, createCanvas, loadImage } from "@napi-rs/canvas"
import { AttachmentBuilder, GuildMember } from "discord.js"

import { ClientEvent } from "@events"
import dym from "@constants/dym"
import { libraries } from "@assets/ts/libraries"
import { canvasRegisterFont, canvasFont } from "@constants/utilities"

/** */
async function generateCanvas(guildMember: GuildMember) {
    /** utils */
    await canvasRegisterFont("./assets/styles/fonts/SketchMatch.ttf", "sketch")
    await canvasRegisterFont(
        "./assets/styles/fonts/LuckiestGuy-Regular.ttf",
        "luckyGuy"
    )
    await canvasRegisterFont(
        "./assets/styles/fonts/KeepCalm-Medium.ttf",
        "keepCalm"
    )

    /** canvas */
    const canvas: Canvas = createCanvas(1024, 500)
    const context = canvas.getContext("2d")

    try {
        /** canvas background */
        const background = await loadImage(`./images/wallpaper.jpg`)
        context.fillStyle = "#ffffff"
        context.drawImage(background, 0, 0, canvas.width, canvas.height)

        /** welcome text */
        const gradient = context.createLinearGradient(0, 0, 1024, 0)
        gradient.addColorStop(0, libraries.randomHexColor(6))
        gradient.addColorStop(0.25, libraries.randomHexColor(6))
        gradient.addColorStop(0.5, libraries.randomHexColor(6))
        gradient.addColorStop(0.75, libraries.randomHexColor(6))
        gradient.addColorStop(1, libraries.randomHexColor(6))
        context.strokeStyle = gradient
        context.font = await canvasFont(canvas, "welcome", "sketch", 60, 320)
        context.textAlign = "center"
        context.lineWidth = 3
        context.strokeText("welcome", 512, 345)
        context.fillStyle = "#ffffff"
        context.fillText("welcome", 512, 345)

        /** username */
        context.font = await canvasFont(
            canvas,
            guildMember.user.tag,
            "luckyGuy",
            80,
            850
        )
        context.textAlign = "center"
        context.lineWidth = 8
        context.strokeText(guildMember.user.tag, 512, 450)
        context.fillStyle = "white"
        context.fillText(guildMember.user.tag, 512, 450)

        /** avatar */
        context.beginPath()
        context.arc(512, 150, 125, 0, Math.PI * 2)
        context.fill()
        context.closePath()

        context.beginPath()
        context.arc(512, 150, 122, 0, Math.PI * 2)
        context.stroke()
        context.closePath()
        context.clip()
        const avatar = await loadImage(
            guildMember.user.displayAvatarURL({ extension: "png" })
        )
        context.drawImage(avatar, 512 - 122, 150 - 122, 244, 244)
    } catch (e) {
        console.log(e)
    }

    /** */
    return new AttachmentBuilder(await canvas.encode("png"), {
        name: "profile-image.png",
    })
}

/** */
export default {
    name: "guildMemberAdd",
    execute: async (_, guildMember) => {
        /** set base role if exists */
        const target: "user" | "bot" = guildMember.user.bot ? "bot" : "user"
        if (dym[`${target}BaseroleId`][guildMember.guild.id])
            guildMember.roles.add(
                dym[`${target}BaseroleId`][guildMember.guild.id]
            )

        /** doesn't need to do more if is bot */
        if (target === "bot") return

        /** welcome message */
        let welcomeMessage = dym.welcomeMessageTemplate
            .replace("$MENTION$", `<@${guildMember.id}>`)
            .replace("$SERVER$", guildMember.guild.name)
            .replace("$RULES$", `<#${guildMember.guild.rulesChannelId}>`)

        /** generate welcoming message's utils */
        const canvas = await generateCanvas(guildMember)
        const color = libraries.randomColor()

        /** send welcoming message */
        await guildMember.guild.systemChannel?.send({
            embeds: [{ color, description: welcomeMessage }],
            files: [canvas],
        })
    },
} as ClientEvent<"guildMemberAdd">
