import express from "express"
import 'dotenv/config'
import cors from 'cors'
import connecteddb from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/CartRoutes.js";
import orderRouter from "./routes/orderRoute.js";



const app=express();
const port = process.env.PORT || 4000
connecteddb();
connectCloudinary() 

//middlware setup

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://foodexperss-c3u3.vercel.app/",
    "https://foodexperss-mu.vercel.app/"
  ],
  credentials: true
}));


//define api routes

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);




// root endpoint to check api status
app.get('/',(req,res)=>{
    res.send('API succesfully connected...');
})




app.listen(port,()=>console.log(`server is ruunig on port ${port}`))