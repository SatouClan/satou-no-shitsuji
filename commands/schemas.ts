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
                description: "math clause to calculate 🖖",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: "baserole",
        description: "set base role for new members ✨",
        options: [
            {
                required: true,
                name: "role",
                description: "base role",
                type: ApplicationCommandOptionType.Role,
            },
        ],
    },
]

export default schemas
