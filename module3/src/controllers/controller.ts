import { Request, Response } from "express"
import { Timer } from "../functions/Timer"
const userService = require('../services/userService')

const timer = new Timer()

class UserController {

	public async getUsers(req: Request, res: Response) {
		timer.start = Date.now()
		const data = await userService.get()
		return res.status(200).json(data)
	}

	public async postUser(req: Request, res: Response) {
		const {username} = req.body
		await userService.post(username, timer.end())
		return res.status(200).send('Post user')
	}
}

module.exports = new UserController()