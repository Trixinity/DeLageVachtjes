import { ChatInputCommand, Command } from '@sapphire/framework';
import { MessageActionRow, MessageEmbed } from 'discord.js';

export class AddroleCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
		console.log('built addrole command');
		super(context, { ...options });
	}
    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering addrole command');
		registry.registerChatInputCommand((builder) =>
			builder.setName('addrole').setDescription('Voeg rollen toe aan jezelf'),
		);
	}
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
       if (interaction.guild === null) {
        return interaction.reply("Je runt dit niet in een server.");
       }
       let embed = new MessageEmbed()
            .setFields(
                {name: 'Command om aan jezelf rollen te geven', value: ``}
            );
    }
}