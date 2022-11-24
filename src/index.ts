import { LogLevel, SapphireClient } from '@sapphire/framework';
import { readFile } from 'node:fs/promises';

async function main() {
	const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'], logger: { level: LogLevel.Debug } });

	const content = await readFile('./config.json', { encoding: 'utf8' });
	const config = JSON.parse(content);

	await client.login(config.token);
}

main().catch((err) => console.error(err));
