import dotenv from 'dotenv';

// configure dotenv:
dotenv.config();

// destructure used env variables:
const {
	SERVER_HOST,
	SERVER_PORT,
	NODE_ENV,
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB,
	POSTGRES_DB_TEST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	BCRYPT_PASSWORD,
	SALT_ROUNDS,
} = process.env;

export default {
	serverHost: SERVER_HOST,
	serverPort: SERVER_PORT,
	postgresHost: POSTGRES_HOST,
	postgresPort: POSTGRES_PORT,
	postgresDB: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
	postgresUser: POSTGRES_USER,
	postgresPassword: POSTGRES_PASSWORD,
	bcryptPassword: BCRYPT_PASSWORD,
	saltRounds: SALT_ROUNDS,
};
