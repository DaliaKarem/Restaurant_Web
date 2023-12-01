const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');//middleware logger
const bodyParser = require('body-parser'); // Add this line

dotenv.config({path:'config.env' });
const app=express();
const path = require('path');
const DB=require('./config/DB')


const CategoryRoute=require('./Routes/CategoryRoute');
const ProductModel=require('./models/ProductModel');
const CategoryModel = require('./models/CategoryModel');
//connect DataBase
DB();
//Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Add this line
app.use(express.json())
app.use(morgan('dev'))
//Routes
app.use("/api/v1/categories",CategoryRoute)

app.use(express.static(path.join(__dirname,'public')));

//Pages
app.get('/',(req,res)=>{
    res.redirect('/start.html');
})
app.get('/Home',(req,res)=>{
    return res.sendFile(path.join(__dirname, 'public', 'HomePage', 'HomePage.html'));
})
app.get('/AddProduct',(req,res)=>{
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

app.post("/AddProduct",async(req,res)=>{
    console.log("Add product")
    console.log(req.body)
    let product=await ProductModel.create(req.body)
    res.status(200).json({success:true,Products:product});

})
app.post("/getProducts",async(req,res)=>{
        let Products=await ProductModel.find()
        console.log("Poducts: "+Products);
        res.status(200).json({success:true,Products:Products,msg:" Products found"});
        //res.sendFile("pages/signup.html",{root:__dirname});
});
app.post("/AddCategory",async(req,res)=>{
    console.log("Add Category")
    console.log(req.body)
    let category=await CategoryModel.create(req.body)
    res.status(200).json({success:true,categorys:category});

})
app.post("/getCategory",async(req,res)=>{
    console.log(req.body)
    let category=await CategoryModel.find()
    res.status(200).json({success:true,categorys:category});

})
app.use('*',(req,res,next)=>{
    res.status(404);
    res.send('<h1>404 Not Found</h1>');
})
app.listen(process.env.Port,()=>{
    console.log(`server is running on ${process.env.Port}`);
})