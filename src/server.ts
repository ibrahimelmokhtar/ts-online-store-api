import app from './config/server.config';

// extract used env variables:
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

// server is listening to specific port:
app.listen(port, (): void => {
	console.log(`>>> server is running at http://${host}:${port}\n`);
});

export default app;
