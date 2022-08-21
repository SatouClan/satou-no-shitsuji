/** necessary discord.js classes */
import { ActivityType, Client, GatewayIntentBits } from "discord.js"

/** environment variables */
import { TOKEN } from "./constants/config"

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
    console.log(
        `> Logged in as ${instance.user.username}#${instance.user.discriminator}`
    )

    /** set activity for the client */
    client.user?.setActivity(`Serving tea!`, {
        type: ActivityType.Playing,
        name: "Serving tea!",
    })

    /** events to run when interaction is created */
    run(client)
})

/** login client */
client.login(TOKEN)
