import { JSONEncodable, APIEmbed } from "discord.js"
import { DISCRIMINATOR, ICON_URL, NAME } from "./config"

const HELP: JSONEncodable<APIEmbed> | APIEmbed = {
    author: {
        name: `${NAME}#${DISCRIMINATOR}`,
        icon_url: ICON_URL ?? "",
        url: ICON_URL ?? "",
    },
    color: parseInt("DCDCAA", 16),
}

export default HELP
