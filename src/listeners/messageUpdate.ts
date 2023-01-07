import { Listener } from '@sapphire/framework';
import type { Client } from 'discord.js';

export class EditListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'messageUpdate'
        });
    }
    public run(client: Client) {
        const { username, id } = client.user!;
    }
}