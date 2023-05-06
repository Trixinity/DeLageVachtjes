import { DataSource } from "typeorm";
import { entities } from "./entities/index.js";

async function createConnectionToDB() {
	try {
		const ds =  new DataSource({
			type: 'postgres',
			host: process.env.PGHOST ?? 'localhost',
			port: parseInt(process.env.PGPORT ?? '', 10) || 5432,
			username: process.env.PGUSER ?? 'postgres',
			password: process.env.PGPASSWORD ?? '',
			database: process.env.POSTGRES_DATABASE ?? 'lagevachtjes',
			entities,
			synchronize: true,
		});
		await ds.initialize()

		return ds
	} catch (e) {
		console.error(
			new Error(`Failed to connect to the database with: host: ${
			process.env.PGHOST
			} port: ${process.env.PGPORT
			} username: ${process.env.PGUSER
			}`,
			)
		);
		throw e;
	}
}

export const database = await createConnectionToDB();
