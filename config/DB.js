const mongoose=require('mongoose')

const DB_Config=()=>{
    mongoose.connect(process.env.DB_URI)
.then((con)=>{console.log(`DB connectes ${con.connection.host}`)})
.catch((error)=>{console.error(`DataError ${error}`),process.exit(1)});

}
module.exports=DB_Config