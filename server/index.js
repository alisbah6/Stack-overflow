import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
const app=express();
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/Question.js';
import answerRoutes from './routes/Answer.js';

dotenv.config();
app.use(express.json({limit:"30mb",extends:true}));
app.use(express.urlencoded({limit:"30mb",extends:true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("This is stack overflow clone API")
})
app.use('/user',userRoutes);
app.use('/question',questionRoutes);
app.use('/answer',answerRoutes);
const PORT= process.env.PORT || 5000;

const Connect_URL="mongodb+srv://alisbahhina:EpwyjtxwmU8uTIlx@cluster0.fjfwp6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(Connect_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
.catch((err)=>console.log(err.message));