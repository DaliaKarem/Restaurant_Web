const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');//middleware logger
const bodyParser = require('body-parser'); // Add this line

dotenv.config({path:'config.env' });
const app=express();
const path = require('path');
const DB=require('./config/DB')

//connect DataBase
DB();
//Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Add this line
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.redirect('/start.html');
})
app.post('/Home',async (req, res) => {
    console.log("here is /Home");
    // Assuming you have user authentication logic here
    const { email, password } = req.body;
    console.log(email + ' ' + password);
    if(email==='Dalia' && password==='222')
{
    return res.sendFile(path.join(__dirname, 'public', 'HomePage', 'HomePage.html'));

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