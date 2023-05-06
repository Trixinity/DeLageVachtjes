import { LogLevel, SapphireClient } from '@sapphire/framework';
import { schedule } from 'node-cron';
import { trackBirthdays } from './utils/birthdaytracking.js';

async function main() {
	const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'], logger: { level: LogLevel.Debug } });

	const token = process.env['BOT_TOKEN'];
	if (typeof token === 'undefined') {
		console.error('no token provided');
		process.exit(1);
	}

	schedule('1 0 * * *', () => trackBirthdays(client).catch((err) => console.error(err)), {timezone: "Europe/Amsterdam"})

	await client.login(token);
}

main().catch((err) => console.error(err));
