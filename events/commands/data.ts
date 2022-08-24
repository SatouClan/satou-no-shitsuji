import {
    ApplicationCommandData,
    ApplicationCommandOptionType,
    Client,
    CommandInteraction,
} from "discord.js"

export const list: ApplicationCommandData[] = [
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
        description: "set baserole for new members ✨",
        options: [
            {
                name: "bot",
                description: "set baserole for bots 🤖",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        required: true,
                        name: "role",
                        description: "baserole for bots",
                        type: ApplicationCommandOptionType.Role,
                    },
                ],
            },
            {
                name: "user",
                description: "set baserole for user 👤",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        required: true,
                        name: "role",
                        description: "baserole for users",
                        type: ApplicationCommandOptionType.Role,
                    },
                ],
            },
        ],
    },
]

export interface SlashCommand {
    name: string
    execute: (client: Client<true>, interaction: CommandInteraction) => any
    [key: string]: any
}
