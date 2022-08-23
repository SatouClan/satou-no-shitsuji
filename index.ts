/** express keep awake */
import express from "express"

/** necessary discord.js classes */
import { ActivityType, Client, GatewayIntentBits } from "discord.js"

/** environment variables */
import { TOKEN, PORT } from "./constants/config"

/** utilities */
import init_commands from "./commands"
import init_messages from "./messages"
import init_reactions from "./reactions"
import init_events from "./events"

/** create a client instance */
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
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
    })

    /** events */
    init_commands(instance)
    init_messages(instance)
    init_reactions(instance)
    init_events(instance)
})

/** */
/** create an instance of express app */
const app = express()

app.all("/", (_, res) => {
    /** return response */
    res.json({
        name: "Satou no Shitsuji",
        type: "Bot",
        status: "activated",
        doing: "Serving tea 🍵",
    })
})

/** login client then start the server */
client
    .login(TOKEN)
    .then(() =>
        app.listen(PORT, () => console.log(`> App listening on http://localhost:${PORT}`))
    )
