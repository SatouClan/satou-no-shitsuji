import { ApplicationCommandData, ApplicationCommandOptionType } from "discord.js"

const schemas: ApplicationCommandData[] = [
    {
        name: "ping",
        description: "health check 🏓",
    },
    {
        name: "calc",
        description: "calculate the following math clause",
        options: [
            {
                name: "math",
                description: "math clause to calculate",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
]

export default schemas
