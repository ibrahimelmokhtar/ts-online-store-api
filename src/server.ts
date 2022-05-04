import app from './config/server.config';
import config from './config/env.config';

// server is listening to specific port:
app.listen(config.SERVER_PORT, (): void => {
	console.log(
		`>>> server is running at http://${config.SERVER_HOST}:${config.SERVER_PORT}\n`
	);
});

export default app;
