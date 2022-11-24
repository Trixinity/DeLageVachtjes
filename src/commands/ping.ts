import { ChatInputCommand, Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';

export class PingCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		console.log('built ping command');
		super(context, { ...options });
	}

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering ping command');
		registry.registerChatInputCommand((builder) =>
			builder.setName('ping').setDescription('Ping bot to see if it is alive'),
		);
	}

	public async ChatInputRun(interaction: Command.ChatInputInteraction) {
		const msg = await interaction.reply({ content: `Ping?`, ephemeral: true, fetchReply: true });

		if (isMessageInstance(msg)) {
			const diff = msg.createdTimestamp - interaction.createdTimestamp;
			const ping = Math.round(this.container.client.ws.ping);
			return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
		}

		return interaction.editReply('Failed to retrieve ping :(');
	}
}
