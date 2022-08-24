/** essentials */
import { Routes } from "discord.js"
import { REST } from "@discordjs/rest"

/** schemas for commands */
import { list } from "./data"

/** env */
import { CLIENT_ID, TOKEN } from "@constants/config"

export default async function register() {
    const rest = new REST({ version: "10" }).setToken(TOKEN)

    await rest
        .put(Routes.applicationCommands(CLIENT_ID), { body: list })
        .then(() => console.log("> Successfully registered application slash commands"))
        .catch(console.error)
}
