const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
	username: String,
	time: Number
},
{
	versionKey: false,
})

export default mongoose.model('User', userModel)