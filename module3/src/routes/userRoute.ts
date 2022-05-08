const Router = require('express')
const userRoutes = new Router()
const controller = require('../controllers/controller')



userRoutes
	.route('/')
	.get(controller.getUsers)
	.post(controller.postUser);

module.exports = userRoutes
	

