
// import to modules
const http =require('http');
const app = require('./app');//import node_project file here
const sever = http.createServer(app);
const mongoose =require('mongoose');

//connect mongodb with localhost
mongoose.connect('mongodb://localhost:27017/sss',{
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
mongoose.connection.on('error',err =>{
	console.log('connection fail');

})
mongoose.connection.on('connected',connected =>{
	console.log('mongodb connected');
})

// connect to browser
const port = process.env.port ||3016;
sever.listen(port, function(error){
	if(error){
		console.log(error)
	}else{
		console.log("The server is running at port 3016");
	}
});











