import { Listener, Events } from '@sapphire/framework';
//import { Message, MessageEmbed } from 'discord.js';

//const logging_channel_id = '1044029617507401868'

export class DeleteListener extends Listener<typeof Events.MessageDelete> {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'messageDelete'
        });
    }
    public async run() {

    }
}