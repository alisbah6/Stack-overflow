import express  from "express";
import { signup,login } from "../controllers/auth.js";
import {getAllUsers,updateProfile} from '../controllers/users.js';
const router=express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/getAllUsers').get(getAllUsers);
router.route('/update/:id').patch(updateProfile);
export default router;
