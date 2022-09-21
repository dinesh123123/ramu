//import dependacies modules
const express =require("express")
const router=express();
const mobileController =require("../controllers/mobile_controllers")
const multer=require('multer');
const path =require('path');
const bodyParser = require("body-parser");

//middlewere 
router.use(express.static('public'))
const filePath = path.join(__dirname, '../public/Postimages');
router.set(path.join(__dirname, '../public/Postimages'));


//body parser using
router.use(bodyParser.urlencoded({ extended:false }));
router.use(bodyParser.json());

//set up multer
const storage=multer.diskStorage({
    destination:function(req,file,cb){
    	cb(null,path.join(__dirname,"../public/Postimages"),function(err,sucess){
    		if(err){
    			console.log(err)
    		}
    	});
    },
filename:function(req,file,cb){
            const name =Date.now()+'-'+file.orginalname;
            cb(null,name,function(err,sucess){
                if (err) {
console.log(err)
                }
            });

    	}
});

const upload = multer({storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ){
        callback(null,true)
    }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
    }

   },
   limits:{

    filesize:1000000 //1000000 
   }
});

//import controllers phone_number login file
router.post("/login",mobileController.mobileNumber);
router.post("/verifyotp",mobileController.verifyOtp);
router.post("/notification",upload.single('image'),mobileController.notificationMethod);


module.exports=router;
