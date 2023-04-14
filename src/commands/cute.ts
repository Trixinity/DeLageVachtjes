import { ChatInputCommand, Command } from '@sapphire/framework';
import { MessageEmbed } from 'discord.js';

export class CuteCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		console.log('built cutecheck command');
		super(context, { ...options });
	}

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering cutecheck command');
		registry.registerChatInputCommand((builder) =>
			builder
				.setName('cute-test').setDescription('Test de schattigheid')
				.addUserOption((option) =>
					option
						.setName('user')
						.setDescription('Op wie wil je het testen?')
						.setRequired(true)
				)
		);
	}
    public getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
	public progressBar(level: number) {
		const lightshade = '░';
		const fullblock = '█';
		const conversion = Math.floor(level / 10)
		return `${fullblock.repeat(conversion)}${lightshade.repeat(10 - conversion)}`;
	}

    public async chatInputRun(interaction: Command.ChatInputInteraction) {
		if (interaction.guild === null) {
			return interaction.reply('Je runt dit niet in een server.');
		}
		let userToCheck = interaction.options.getUser('user', true).id;
		if (userToCheck = '210335930706427906') {
			return interaction.reply('We weten dat Trixi een cute klein draakje is smh.')
		}
        const trixiconURL = "https://media.discordapp.net/attachments/462564425866412045/1035666899389919353/20210806_005557.jpg?width=466&height=466";
		const percentage = this.getRandomInt(101);
        const bar = this.progressBar(percentage);
		const description = `<@${userToCheck}>, jij bent ${percentage}% schattig ${percentage <30 ? '💔' : '❤️'} \n${bar}`
        const embed = new MessageEmbed()
			.setDescription(description)
			.setColor([149, 120, 162])
			.setFooter({text: "Bot gemaakt en beheerd door Trixinity#0164", iconURL: trixiconURL});
        return interaction.reply({embeds: [embed], ephemeral: false});
    }
}