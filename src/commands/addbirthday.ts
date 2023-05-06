import { ChatInputCommand, Command } from '@sapphire/framework';
import { database } from '../db.js';
import { Birthday } from '../entities/birthday.js';

export class AddbirthdayCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options) {
		console.log('built addbirthday command');
		super(context, { ...options });
	}

	public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
		console.log('registering addbirthday command');
		registry.registerChatInputCommand((builder) =>
			builder.setName('addbirthday').setDescription('voeg je verjaardag')
            .addNumberOption((option) =>
                option
                    .setName('dag')
                    .setDescription('stel je dag')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(31)
            )
            .addNumberOption((option) =>
                option
                    .setName('maand')
                    .setDescription('stel je maand')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(12)
            )
        );
	}
    
    public async chatInputRun(interaction: Command.ChatInputInteraction) {
        if (!interaction.guild) {
            return interaction.reply('Je runt dit niet in een server.')
        }

        const alreadyexists = await database
            .getRepository(Birthday)
            .createQueryBuilder()
            .select('id')
            .where('id = :id', { id: interaction.user.id })
            .getExists();

        if (alreadyexists) {
            await interaction.reply({content: 'Je hebt al je verjaardag toegevoegd!', ephemeral: true})
            return
        }

        const day = interaction.options.getNumber('dag', true);
        const month = interaction.options.getNumber('maand', true);        

        await database
            .createQueryBuilder()
            .insert()
            .into(Birthday)
            .values([
                { id: interaction.user.id, day: day, month: month },
            ])
            .execute()

        return interaction.reply({content: `Je verjaardag staat op ${day}/${month}!`, ephemeral: true});
    }
}