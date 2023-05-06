import { ChatInputCommand, Command } from '@sapphire/framework';
import { database } from '../db.js';
import { Birthday } from '../entities/birthday.js';

export class DeletebirthdayCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		console.log('built dltbirthday command');
		super(context, { ...options });
	}

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering dltbirthday command');
		registry.registerChatInputCommand((builder) =>
			builder.setName('deletebirthday').setDescription('verwijder je verjaardag')
        );
	}
    
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
        if (interaction.guild === null) {
            return interaction.reply('Je runt dit niet in een server.')
        }

        const alreadyexists = await database
            .getRepository(Birthday)
            .createQueryBuilder()
            .select('id')
            .where('id = :id', { id: interaction.user.id })
            .getExists();

        if (alreadyexists === false) {
            interaction.reply({content: 'Je hebt je verjaardag nog niet toegevoegd!', ephemeral: true})
        }     
    
        await database
            .createQueryBuilder()
            .delete()
            .from(Birthday)
            .where('id = :id', { id: interaction.user.id })
            .execute()

        return interaction.reply({content: 'Je verjaardag is verwijderd!', ephemeral: true});
    }
}