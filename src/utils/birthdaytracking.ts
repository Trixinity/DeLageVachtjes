import { Client } from "discord.js";
import { database } from "../db.js";
import { Birthday } from "../entities/birthday.js";

export async function trackBirthdays(client: Client) {
    const now = new Date();
    now.setUTCDate(now.getUTCDate() + 1)

    const birthdays = await database
        .getRepository(Birthday)
        .createQueryBuilder()
        .select()
        .where('day = :day', { day: now.getUTCDate()})
        .andWhere('month = :month', {month: now.getUTCMonth() + 1})
        .getMany();

    const guild = client.guilds.resolve('1035504506366087218');
    if (!guild) {
        console.error("can't get our guild")
        return
    }

    const role = await guild.roles.fetch('1044050847648206880')
    if (!role) {
        console.error("can't get the birthday role")
        return
    }

    const channel = guild.channels.resolve('1035504506919718944')
    if (!channel || !channel.isText()) {
        console.error("can't get the birthday channel")
        return
    }
    
    if (role.members) {
        for (const member of role.members.values()) {
            await member.roles.remove(role);
        }
    }

    for (const birthday of birthdays) {
        const member = guild.members.resolve(birthday.id);

        if (member) {
            await member.roles.add(role);
            await channel.send({
                content: birthdays.length > 1
                    ? `${birthdays.map(birthday => `<@${birthday.id}>`).join(', ')} zijn jarig! Van hartelijk gefeliciteerd!`
                    : `<@${birthdays[0].id}> is jarig! Van hartelijk gefeliciteerd!`
            })
        }
    }
}