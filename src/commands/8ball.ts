import { ChatInputCommand, Command } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

export class EightballCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		console.log('built eightball command');
		super(context, { ...options });
	}

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering eightball command');
		registry.registerChatInputCommand((builder) =>
			builder.setName('8ball').setDescription('laat Trixie je vragen beantwoorden'),
		);
	}
    public getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
        //constants
        const trixiconURL = "https://media.discordapp.net/attachments/462564425866412045/1035666899389919353/20210806_005557.jpg?width=466&height=466";

        const responses = ['Het is vrij zeker.','Zonder twijfel.', 'Jazeker.', 'Je kan er op rekenen.', 'Zoals ik het zie, ja.', 'Hoogstwaarschijnlijk.',
            'Ja.', 'Signalen geven een ja.', 'Het ziet er naar uit.', 'Het is beslist zo.', 'Vraag later nog een keer.', 'Ik kan het beter niet nu zeggen',
            'Ik kan het nu niet voorspellen.', 'Concentreer je en vraag nog een keer.', 'Ik weet het niet zeker, vraag nog een keer.', 'Reken er niet op.',
            'Mijn antwoord is nee.', 'Mijn bronnen zeggen van niet', 'Uitkomst lijkt niet positief', 'Ik betwijfel het.'];

        //We can also debate if we also make this possible to run in an DM
        if (interaction.guild) {
            return interaction.reply('Je runt dit niet in een server.')
        }
        const embed = new MessageEmbed()
            .setDescription(responses[this.getRandomInt(20)])
            .setColor([149, 120, 162])
			.setFooter({text: "Bot gemaakt en beheerd door Trixinity#0164", iconURL: trixiconURL});

        return interaction.reply({embeds: [embed], ephemeral: true});
    }
}