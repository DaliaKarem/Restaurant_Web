const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');//middleware logger
const bodyParser = require('body-parser'); // Add this line
const cors=require('cors');
const multer=require('multer');
dotenv.config({path:'config.env' });
const app=express();
const path = require('path');
const DB=require('./config/DB')


const CategoryRoute=require('./Routes/CategoryRoute');
const ProductRoute=require('./Routes/ProductRoute');
//connect DataBase
DB();
//Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Add this line
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());
const uploads=multer({dest:__dirname + '/Images'});
//Routes
app.use("/Category",CategoryRoute)
app.use("/Products",ProductRoute);
app.use(express.static(path.join(__dirname,'public')));

//Pages
app.get('/',(req,res)=>{
    res.redirect('/start.html');
})
app.get('/Home',(req,res)=>{
    return res.sendFile(path.join(__dirname, 'public', 'HomePage', 'HomePage.html'));
})
app.get('/AddProducts',(req,res)=>{
    return res.sendFile(path.join(__dirname, 'public', 'HomePage','AddProduct', 'AddProduct.html'));
})


//Api
app.post('/Home',async (req, res) => {
    console.log("here is /Home");
    // Assuming you have user authentication logic here
    const { email, password } = req.body;
    console.log(email + ' ' + password);
    if(email==='Dalia' && password==='222')
{
    return res.sendFile(path.join(__dirname, 'public', 'HomePage', 'HomePage.html'));
    //return res.sendFile(path.join(__dirname, 'public', 'HomePage','AddProduct', 'AddProduct.html'));

} else {
        // Handle authentication failure
        res.status(401).send('Authentication failed');
    }
});

app.use('*',(req,res,next)=>{
    res.status(404);
    res.send('<h1>404 Not Found</h1>');
})
app.listen(process.env.Port,()=>{
    console.log(`server is running on ${process.env.Port}`);
})