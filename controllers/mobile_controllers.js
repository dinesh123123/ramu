const bcrypt =require('bcrypt');
const lodash  =require('lodash');
const axios =require('axios');
const otpGenerator =require('otp-generator');
const jwt =require("jsonwebtoken");
//import models
const Mobile =require('../models/Otp_models');
const Notification =require('../models/notification_models');
const Otp =require('../models/otp');

//create mobile number otp

 const mobileNumber =async(req,res)=>{
	const user = await Mobile.findOne({_id:req.body._id});
	if(user)
return res.status(400).send("user already registered");

//otp generate

const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const number =req.body.number;
console.log(OTP);
const otp =new Otp ({number:number,otp:OTP});
/*const salt =await bcrypt.genSalt(10);
otp.otp =await bcrypt.hash(otp.otp,salt);*/
const result =await otp.save();
return res.status(200).send({result:true,msg:'otp send sucessfully',data:otp})
};

//verif otp
const verifyOtp =async(req,res)=>{
	const {number,otp}=req.body;
	const otpHolder =await Otp.find({number,otp})
	if(otpHolder.length>0){
		res.status(200).send({
			sucess:true,
			msg:"login sucessfully",
			data:otpHolder
		})
	}
	else{
		return res.status(201).send({sucess:true,msg:"your otp was worng"})
	}
};
	
	

//create notification api

const notificationMethod =async(req,res)=>{
	try{
	const notification =new Notification({
			title:req.body.title,
			description:req.body.description,
			date:req.body.date,
			image:{
	data:req.file.filename,
    contentType:'image/png/jpg/jpeg'
			},
		});
	const userData = await notification.save();
	res.status(200).send({sucess:true,msg:'user data',data:userData});

	}catch(error){
		res.status(400).send({sucess:false,msg:error.message});

	}
};


module.exports ={
	mobileNumber,
	verifyOtp,
	notificationMethod
}