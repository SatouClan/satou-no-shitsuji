import {
    ApplicationCommandData,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    Interaction,
} from "discord.js"

export const list: ApplicationCommandData[] = [
    {
        name: "ping",
        type: ApplicationCommandType.ChatInput,
        description: "health check 🏓",
    },
    {
        name: "calc",
        description: "calculate the following math clause",
        type: ApplicationCommandType.ChatInput,
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
        type: ApplicationCommandType.ChatInput,
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

export interface Command {
    name: string
    execute: (client: Client<true>, interaction: Interaction) => any
}
