import { Interaction } from "discord.js"

import { libraries } from "@assets/ts/libraries"

export const NAME: string = "Satou no Shitsuji"
export const DISCRIMINATOR = 4685
export const ICON_URL = ""

export const TOKEN: string = process.env.TOKEN ?? ""
export const CLIENT_ID: string = process.env.CLIENT_ID ?? ""
export const GUILD_ID: string = process.env.GUILD_ID ?? ""

export const PORT = process.env.PORT ?? 3000

export const newDate = (date: Date = new Date()) => {
    if (typeof date === "string")
        return new Date(
            new Date(date).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        )

    return new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }))
}

export const createTimestamp = ({ createdTimestamp }: Interaction) =>
    libraries.prettyTime({ timestamp: newDate(new Date(createdTimestamp)) })
