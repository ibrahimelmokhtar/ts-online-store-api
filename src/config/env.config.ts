import dotenv from 'dotenv';

// configure dotenv:
dotenv.config();

// destructure used env variables:
const {
	SERVER_HOST,
	SERVER_PORT,
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB,
	POSTGRES_DB_TEST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
} = process.env;

export default {
	SERVER_HOST,
	SERVER_PORT,
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB,
	POSTGRES_DB_TEST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
};
