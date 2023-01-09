import { LogLevel, SapphireClient } from '@sapphire/framework';

async function main() {
	const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'], logger: { level: LogLevel.Debug } });

	const token = process.env['BOT_TOKEN'];
	if (typeof token === 'undefined') {
		console.error('no token provided');
		process.exit(1);
	}

	await client.login(token);
}

main().catch((err) => console.error(err));
