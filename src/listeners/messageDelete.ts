import { Listener, Events } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { formatDate, limitLength } from '../utils/formatting.js';

const logging_channel_id = '1044029617507401868'

export class DeleteListener extends Listener<typeof Events.MessageDelete> {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            event: 'messageDelete'
        });
    }
    public async run(message: Message) {
        const channel_id = message.channelId;

        if (!message.guild) return

        if (message.author.bot) return

        const channel = this.container.client.channels.resolve(logging_channel_id)
        if (!channel || !channel.isText()) throw new Error("Can't find the message logging channel")

        let embed = new MessageEmbed()
            .setTitle('Bericht is verwijderd')
            .setDescription('**Verwijderd bericht:**\n' + limitLength(message.content) + `\n\n **In het kanaal:**\n <#${channel_id}> `)
            .setColor('#ff9933')
            .setAuthor({
                iconURL: message.author.avatarURL() ?? undefined,
                name: message.author.tag
            })
            .setFooter({text: formatDate(new Date())});
        
        if (message.attachments.size >= 1 || message.embeds.length >= 1) {
            embed = embed.addFields({name: 'Er was een bijlage verwijderd', value: `Er waren ${message.attachments.size} bijlagen en ${message.embeds.length} embeds verwijderd.`});
        }

        await channel.send({embeds: [embed]})

    }
}