import { DataSource } from "typeorm";
import { entities } from "./entities/index.js";

async function createConnectionToDB() {
	try {
		const ds =  new DataSource({
			type: 'postgres',
			host: process.env.POSTGRES_HOST ?? 'localhost',
			port: parseInt(process.env.POSTGRES_PORT ?? '', 10) || 5432,
			username: process.env.POSTGRES_USERNAME ?? 'postgres',
			password: process.env.POSTGRES_PASSWORD ?? '',
			database: process.env.POSTGRES_DATABASE ?? 'lagevachtjes',
			entities,
			synchronize: true,
		});
		await ds.initialize()

		return ds
	} catch (e) {
		console.error(
			new Error(`Failed to connect to the database with: host: ${
			process.env.POSTGRES_HOST
			} port: ${process.env.POSTGRES_PORT
			} username: ${process.env.POSTGRES_USERNAME
			}`,
			)
		);
		throw e;
	}
}

export const database = await createConnectionToDB();
