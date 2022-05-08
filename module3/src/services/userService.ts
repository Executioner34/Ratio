import {Document, MongooseError} from 'mongoose'
import { Response, Request } from 'express';

const mongoose = require('mongoose')

import {default as User} from '../db/UserSchema';

class userService {
	public async get(req: Request, res: Response) {
		const data = await User.find({}, (err: MongooseError, docs: Document) =>{
			if(err) return console.log(err)
			return docs
		}).clone()
		return data
	}

	public async post(username: string, time: number) {
		await User.create({ username, time }, (err: MongooseError, docs: Document) => {
			if (err) {
				return console.log(err);
			}
			return `Сохранен user ${docs}`;
		})
		
	}

}

module.exports = new userService()

