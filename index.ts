/** express keep awake */
import express from "express"

/** necessary discord.js classes */
import { ActivityType, Client, GatewayIntentBits } from "discord.js"

/** environment variables */
import { TOKEN, PORT } from "./constants/config"

/** commands section */
import { run } from "./commands"

/** create a client instance */
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.MessageContent,
    ],
})

/** run when ready */
client.once("ready", (instance): void => {
    console.log(`> Logged in as ${instance.user.username}#${instance.user.discriminator}`)

    /** set activity for the client */
    client.user?.setActivity({
        name: "Serving tea 🍵",
        type: ActivityType.Competing,
        url: "https://i.imgflip.com/xaq3d.jpg",
    })

    /** events to run when interaction is created */
    run(client)
})

/** login client */
client.login(TOKEN)

/** */
/** create an instance of express app */
const app = express()

app.all("/", (req, res) => {
    /** return response */
    res.json({
        name: "Satou no Shitsuji",
        type: "Bot",
        status: "activated",
        doing: "Serving tea 🍵",
    })
})

/** listen */
app.listen(PORT, () => console.log(`> App listening on http://localhost:${PORT}`))
