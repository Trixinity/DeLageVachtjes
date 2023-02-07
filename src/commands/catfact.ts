import { ChatInputCommand, Command } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';
import config from '../../config.json';
import fetch from 'node-fetch';

const response = await fetch('https://catfact.ninja/fact');
const data = await response.json();

console.log(data)

export class CatfactCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		console.log('built catfact command');
		super(context, { ...options });
	}

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering catfact command');
		registry.registerChatInputCommand((builder) =>
			builder.setName('cat-fact').setDescription('Krijg een katten fact'),
		);
	}
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
		if (interaction.guild === null) {
			return interaction.reply('Je runt dit niet in een server.');
		}

		const trixiconURL = "https://media.discordapp.net/attachments/462564425866412045/1035666899389919353/20210806_005557.jpg?width=466&height=466";
		
		const description = data[1];
		let embed = new MessageEmbed()
			.setDescription('')
			.setColor([149, 120, 162])
			.setFooter({text: "Bot gemaakt en beheerd door Trixinity#0164", iconURL: trixiconURL});
		
			return interaction.reply({embeds: [embed], ephemeral: true});
    }

}