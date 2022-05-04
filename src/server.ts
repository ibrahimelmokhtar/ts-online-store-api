import app from './config/server.config';
import config from './config/env.config';

// server is listening to specific port:
app.listen(config.serverPort, (): void => {
	console.log(
		`>>> server is running at http://${config.serverHost}:${config.serverPort}\n`
	);
});

export default app;
