import  express from "express";
// import auth from "../middlewares/auth.js";
import {postAnswer,deleteAnswer} from '../controllers/Answer.js'

const router=express.Router();

router.patch('/post/:id',postAnswer);
router.patch('/delete/:id',deleteAnswer);

export default router;