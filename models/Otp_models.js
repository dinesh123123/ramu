
// create Schema
const mongoose=require('mongoose');
const mobileSchema =mongoose.Schema({
	
	number:{
		type:String,
		required:true,
		min:10,
		max:12
	},
token: { 
 	type: String,
 	default:'' 
 },
	
},{timestamps:true});
module.exports =Mobile=mongoose.model('Mobile',mobileSchema);