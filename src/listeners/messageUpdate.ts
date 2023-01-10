import { Listener, Events } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { formatDate, limitLength } from '../utils/formatting.js';

const logging_channel_id = '1044029617507401868'

export class EditListener extends Listener<typeof Events.MessageUpdate> {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'messageUpdate'
        });
    }
    public async run(oldMessage: Message, newMessage: Message) {
        const channel_id = oldMessage.channelId;

        if (oldMessage.content === newMessage.content) return
        
        if (oldMessage.author.bot) return

        if (!oldMessage.guild) return
        
        const channel = this.container.client.channels.resolve(logging_channel_id)
        if (!channel || !channel.isText()) throw new Error("Can't find the message logging channel")

        const embed = new MessageEmbed()
            .setTitle('Bericht is veranderd')
            .setDescription('**Oud:**\n' + limitLength(oldMessage.content) + '\n\n**Nieuw:**\n' + limitLength(newMessage.content) + `\n\n **In het kanaal:**\n <#${channel_id}>`)
            .setColor('#ff9933')
            .setAuthor({
                iconURL: oldMessage.author.avatarURL() ?? undefined,
                name: oldMessage.author.tag
            })
            .setFooter({text: formatDate(new Date())});

        await channel.send({embeds: [embed]})
    }    
}