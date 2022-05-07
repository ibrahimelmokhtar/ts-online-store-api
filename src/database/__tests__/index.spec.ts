import pool from '../index';

describe('├─── Database Connection Suite', () => {
	const currentDate = new Date().toDateString();

	it(`checks DB connection's date to be "${currentDate}"`, async () => {
		const client = await pool.connect();
		const res = await client.query('SELECT NOW()');
		client.release();
		const databaseDate = res.rows[0].now.toDateString();

		expect(databaseDate).toEqual(currentDate);
	});
});
