import { Client } from "discord.js"

import init_service from "./service"

export default function init_events(client: Client<true>) {
    init_service(client)
}
