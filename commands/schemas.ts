import { ApplicationCommandData, ApplicationCommandOptionType } from "discord.js"


const schemas: ApplicationCommandData[] = [
    {
        name: 'ping',
        description: "Check server's ping"
    },
    {
        name: 'calc',
        description: "Calculate the following math clause",
        options: [
            {
                name: 'math',
                description: 'math claus to calculate',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
]


export default schemas
