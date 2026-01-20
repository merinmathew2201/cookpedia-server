const mongoose = require('mongoose')

const connectionString = process.env.DB_URL

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB connected Successfully....");
}).catch(error=>{
    console.log("MongoDB conection failed...");
    console.log(error);
})