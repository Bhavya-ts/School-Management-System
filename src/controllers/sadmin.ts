import { Request , Response , NextFunction } from "express"
import {validateEmail} from "../utills/emailValidator.js";
import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
type reqBody = {
    name : string,
    email :string,
}

export const addTeacher = async (req  : Request, res:Response , next:NextFunction)=>{
    const {name , email , }  : reqBody= req.body;
    if(!name || !email ){
        res.send("please provide the details");
    }
    if(!validateEmail(email)){
        res.send("please provide valid email");
    }

    const password = "123456";
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    try {
        const user = await new userModel({name ,password:passwordHash, email}).save();
        console.log(user);
        
        res.send("user create successfully ");
    } catch (error) {
        res.send("user not added please start again");
    }
    

    console.log(name);
    
    
}