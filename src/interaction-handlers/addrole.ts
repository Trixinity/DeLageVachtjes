import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import type { ButtonInteraction, GuildMember } from 'discord.js';
import { roles } from '../commands/addrole.js'
import { Option } from '@sapphire/result';

type Province = keyof typeof roles
export class AddRoleInteractionHandler extends InteractionHandler {
public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {...options, interactionHandlerType: InteractionHandlerTypes.Button });
    }
  public async run(interaction: ButtonInteraction, province: InteractionHandler.ParseResult<this>) {
    const memberRoles = (interaction.member! as GuildMember).roles
    if (memberRoles.cache.has(roles[province])) {
        await memberRoles.remove(roles[province]);
        return await interaction.reply({content: `Je hebt nu de rol <@&${roles[province]}> weggehaald`, embeds: [], components: [], ephemeral: true});
    }
    await memberRoles.add(roles[province]);
    await interaction.reply({content: `Je hebt nu de rol <@&${roles[province]}> gekregen`, embeds: [], components: [], ephemeral: true});
  }
  public override parse(interaction: ButtonInteraction):Option<Province>  {
    if (!interaction.member) return this.none();
    if (interaction.customId.split('-')[1] !== 'addrole') return this.none();
    return this.some(interaction.customId.split('-').slice(2).join('-') as Province);
  }
}