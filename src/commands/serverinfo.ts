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
			//const inviteURL = interaction.guild.vanityURLCode;

			//print in embed
			let embed = new MessageEmbed().setDescription(`**Server informatie**\n Naam van de server: ${name}\n Het aantal members: ${members}
			De datum van creatie: <t:${datecreate}:d>\n De eigenaar van de server is: <@${owner}>\n De totale aantal boosts zijn: ${totalnumerboost}
			`).setColor([149, 120, 162]);

			//check if server has an icon
			if (iconURL !== null) {
				embed = embed.setThumbnail(iconURL);
			}
			/**if (inviteURL !== null) {
				
			}**/	
			return interaction.reply({embeds: [embed], ephemeral: true});
	}
}