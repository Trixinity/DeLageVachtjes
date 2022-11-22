import { SapphireClient } from '@sapphire/framework';
import { readFile } from 'node:fs/promises';

const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

const content = await readFile('./config.json', { encoding: 'utf8' })
const config = JSON.parse(content);

client.login(config.token);