import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import indexRoutes from './routes/indexRoutes';
import notesRoutes from './routes/NotesRoutes';
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
				useFindAndModify: false,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('>>>Base de datos conectada<<< ');
			});

		///Settings
		this.app.set('port', process.env.PORT || 4000);

		///Middlewares
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cors());
	}

	routes() {
		this.app.use(indexRoutes);
		this.app.use('/api/notas', notesRoutes);
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log(`>>>Servidor corriendo en el puerto ${this.app.get('port')}<<<`);
		});
	}
}

const server = new Server();

server.start();
