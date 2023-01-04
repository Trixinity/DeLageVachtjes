import { ChatInputCommand, Command } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

export class ServerinfoCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
		console.log('built serverinfo command');
		super(context, { ...options });
	}
    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering serverinfo command');
		registry.registerChatInputCommand((builder) =>
			builder.setName('serverinfo').setDescription('Server statistieken weergeven'),
		);
	}
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
		if (interaction.guild === null) {
			return interaction.reply("Je runt dit niet in een server");
		}
		//info constants
		const members = interaction.guild.memberCount;
		const name = interaction.guild.name;
		const datecreate = Math.floor(interaction.guild.createdAt.getTime() / 1000);
		const iconURL = interaction.guild.iconURL();
		const owner = interaction.guild.ownerId;
		const totalnumerboost = interaction.guild.premiumSubscriptionCount;
		const trixiconURL = "https://media.discordapp.net/attachments/462564425866412045/1035666899389919353/20210806_005557.jpg?width=466&height=466"
		const inviteURL = interaction.guild.vanityURLCode;
		const datejoin = Math.floor(interaction.guild.joinedAt.getTime() / 1000);

			//Create embed
		let embed = new MessageEmbed()
			.setDescription('**Server informatie**')
			.setFields(
				{name: 'Naam van de server', value: `${name}`},
				{name: 'Het aantal members', value: `${members}`},
				{name: 'De datum van creatie:', value: `<t:${datecreate}:d>`},
				{name: 'De eigenaar van de server is:', value: `<@${owner}>`},
				{name: 'De totale aantal boosts zijn:', value: `${totalnumerboost}`},
				{name: 'Je bent de server gejoined op:', value: `<t:${datejoin}:d>`}
			)
			.setColor([149, 120, 162])
			.setFooter("Bot gemaakt en beheerd door Trixinity#0164", trixiconURL);

		//check if server has an icon
		if (iconURL !== null) {
			embed = embed.setThumbnail(iconURL);
		}
		if (inviteURL !== null) {
			embed = embed.addFields({ name: 'Serverlink', value: 'https://discord.gg/' + inviteURL});
		}
		return interaction.reply({embeds: [embed], ephemeral: true});
	}
}