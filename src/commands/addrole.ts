import { ChatInputCommand, Command } from '@sapphire/framework';
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';

export const roles = {
    'noord-brabant': '1052027246799499315',
    'zuid-holland': '1052027725864501279',
    'noord-holland': '1052027815542923294',
    'gelderland': '1054424796257071194',
    'utrecht': '1054427312529092628',
    'zeeland': '1054427386118156318',
    'limburg': '1054427459782717480',
    'overijssel': '1054427467198255105',
    'flevoland': '1054427539281563688',
    'friesland': '1054427600971378698',
    'drenthe': '1054427606759514194',
    'groningen': '1054427664062107658',
    'belgisch-limburg': '1054487301704650783',
    'vlaams-brabant': '1054487340120281179',
    'antwerpen': '1054487353965686986',
    'west-vlaanderen': '1054487357765718118',
    'oost-vlaanderen': '1054487360173248563'
};

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
       //declare constants
       const trixiconURL =  "https://media.discordapp.net/attachments/462564425866412045/1035666899389919353/20210806_005557.jpg?width=466&height=466";
       //embed
       let embed = new MessageEmbed()
            .setFields(
                {name: 'Menu om rollen toe te voegen of te verwijderen', value: `Onderaan staan knoppen van rollen die je kan toevoegen als je het nog niet hebt.
                Je kan de rol verwijderen als je de rol al hebt.`},
                {name: 'De rollen', value: `<@&1052027246799499315>, <@&1052027725864501279>, <@&1052027815542923294>
                <@&1054424796257071194>, <@&1054427312529092628>, <@&1054427386118156318>,
                <@&1054427459782717480>, <@&1054427467198255105>, <@&1054427539281563688>,
                <@&1054427600971378698>, <@&1054427606759514194>, <@&1054427664062107658>,
                <@&1054487301704650783>, <@&1054487340120281179>, <@&1054487353965686986>,
                <@&1054487357765718118> en <@&1054487360173248563>\n Waar kom je vandaan?`} //hard coded roles
            )
            .setColor([149, 120, 162])
			.setFooter({text: "Bot gemaakt en beheerd door Trixinity#0164", iconURL: trixiconURL});
        
        const buttons = [];
        for (const role of Object.keys(roles)) {
            buttons.push(new MessageButton()
            .setCustomId(`bttn-addrole-${role}`)
            .setLabel(role.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join('-'))
            .setStyle(`PRIMARY`))
        }

        const rows = []
        for (let i = 0; i < buttons.length; i += 5 ) {
            rows.push(new MessageActionRow()
            .addComponents(buttons.slice(i, i + 5)))
        }

        return interaction.reply({embeds: [embed], components: rows});
    }
}