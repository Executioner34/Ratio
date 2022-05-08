import { Application} from "express";
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const route = require('./src/routes/index')


class Server {
	PORT: number;
	DB_URL: string;
	app: Application;

	constructor(port: number, dbLogin: string, dbPass: string) {
		this.app = express();
		this.PORT = port;
		this.DB_URL = `mongodb+srv://${dbLogin}:${dbPass}@cluster0.zekyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
		this.init()
	}

	private init() {
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use('/api/v1', route)
		this.startApp()
	}

	private async startApp() {
		try {
			await mongoose.connect(this.DB_URL)
			this.app.listen(this.PORT);
			console.log(`Server work. Port:${this.PORT}`)
		} catch (e) {
			console.log(e)
		};
	}
}

const server = new Server(8080, 'admin', 'admin123')


