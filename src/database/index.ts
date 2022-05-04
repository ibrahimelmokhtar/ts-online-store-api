import { Pool } from 'pg';
import config from '../config/env.config';

// create new Pool object with specific configurations:
const pool = new Pool({
	user: config.postgresUser,
	host: config.postgresHost,
	database: config.postgresDB,
	password: config.postgresPassword,
	port: config.postgresPort as unknown as number,
});

// add event listener for 'error' events:
pool.on('error', (error: Error): void => {
	console.error(error.message);
	process.exit(-1);
});

export default pool;
