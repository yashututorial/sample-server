import express from 'express';
import dotenv from 'dotenv';
import connectDB from './data_base/connection.js';


dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT ||  3000;

app.get("/",(req, res)=>{
    res.status(200).json({message: "Hello World"});
})

app.get("/heart-beat",(req, res)=>{
    res.status(200).json({message: "I am alive"});
})

app.get("/phone",(req, res)=>{
    res.status(200).json({message: "My phone number is 1234567890"});
})

//app.listen(port-number,function)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});