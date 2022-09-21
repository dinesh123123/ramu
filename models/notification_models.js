
// create Schema
const mongoose=require('mongoose');
const notificationSchema =mongoose.Schema({
	
	title:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
image:{
		data:Buffer,//buffer is also called binarry data
		contentType:String
	},
	date:{
		type:String,
	default:Date.now,
	
},
},{timestamps:true});
module.exports =Notification=mongoose.model('Notification',notificationSchema);