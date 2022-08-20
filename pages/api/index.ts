/** next api */
import type { NextApiRequest, NextApiResponse } from 'next'

/** necessary discord.js classes */
import { ActivityType, Client, GatewayIntentBits } from "discord.js"

/** environment variables */
import { TOKEN } from 'constants/config'

/** commands section */
import { run } from 'commands'


type Data = {
  name: string
  type: string
  status: 'activated' | 'deactivated'
  doing: string
}


/** create a client instance */
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.MessageContent
  ]
})


/** run when ready */
client.once("ready", (instance): void => {
  console.log(`> Logged in as ${instance.user.username}#${instance.user.discriminator}`)


  /** set activity for the client */
  client.user?.setActivity(`Serving tea!`, {
    type: ActivityType.Playing,
    name: "Serving tea!"
  })


  /** events to run when interaction is created */
  run(client)
})


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  /** login client */
  await client.login(TOKEN)


  /** app listening on */
  console.log(`> App listening on http://localhost:${process.env.PORT ?? 3000}/api`)


  /** send back the api */
  res.status(200).json({
    name: 'Satou no Shitsuji',
    type: 'Bot',
    status: 'activated',
    doing: 'Serving tea 🍵'
  })
}
