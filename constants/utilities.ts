import { Interaction } from "discord.js"
import { readFile } from "fs/promises"
import { Canvas, GlobalFonts } from "@napi-rs/canvas"

import { libraries } from "@assets/ts/libraries"

export const newDate = (date: Date = new Date()) => {
    if (typeof date === "string")
        return new Date(
            new Date(date).toLocaleString("en-US", {
                timeZone: "Asia/Ho_Chi_Minh",
            })
        )

    return new Date(
        date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    )
}

export const createTimestamp = ({ createdTimestamp }: Interaction) =>
    libraries.prettyTime({ timestamp: newDate(new Date(createdTimestamp)) })

export async function canvasFont(
    canvas: Canvas,
    text: string,
    fontFamily: string,
    fontSize: number,
    width: number
) {
    const context = canvas.getContext("2d")

    do {
        // Assign the font to the context and decrement it so it can be measured again
        context.font = `${fontSize}px "${fontFamily}"`
        fontSize -= 1
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (context.measureText(text).width > width)

    // Return the result to use in the actual canvas
    return context.font
}

export async function canvasRegisterFont(
    path: string,
    aliasName: string
): Promise<boolean> {
    return GlobalFonts.register(await readFile(path), aliasName)
}
