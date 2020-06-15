import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	config() {
		///DataBase
		const URI = process.env.MONGODB_URI || 'mongodb://localhost/kubide_notes_api';
		mongoose
			.connect(URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('>>>DB is Connected<<< ');
			});

		///Settings
		this.app.set('port', process.env.PORT || 4000);

		///Middlewares
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
	}

	routes() {}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log(`>>>Server running at port ${this.app.get('port')}<<<`);
		});
	}
}

const server = new Server();

server.start();
