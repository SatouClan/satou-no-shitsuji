/** essentials */
import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'

/** schemas for commands */
import schemas from './schemas'

/** env */
import { CLIENT_ID, TOKEN } from './../constants/config'


export default function deploy(): void {
    const rest = new REST({ version: '10' }).setToken(TOKEN)


    rest.put(Routes.applicationCommands(CLIENT_ID), { body: schemas })
        .then(() => console.log('> Successfully registered application commands'))
        .catch(console.error)
}
