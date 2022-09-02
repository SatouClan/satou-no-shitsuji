/** third party */
import express from "express"
import { ActivityType, Client, GatewayIntentBits, Partials } from "discord.js"

/** environment variables */
import { TOKEN, PORT } from "@constants/config"

/** utilities */
import init_events from "@events"

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

/** create a client instance */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
    ],
})

/** run when ready */
client.once("ready", async (instance): Promise<void> => {
    console.log(`> Logged in as ${instance.user.tag}`)

    /** set activity for the client */
    instance.user.setActivity({
        name: "Serving tea 🍵",
        type: ActivityType.Competing,
    })

    /** events */
    await init_events(instance)
})

/** login client then start the server */
client
    .login(TOKEN)
    .then(() =>
        app.listen(PORT, () => console.log(`> App listening on http://localhost:${PORT}`))
    )
    .catch(console.error)
