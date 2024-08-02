import  bcrypt  from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { userModel } from "../models/user.js";
import { Request, Response} from "express";
import {validateEmail} from "../utills/emailValidator.js";
type reqBody = {
    email : string,
    password : string
}

//sign in function export
export const sigin = async (req :Request, res:Response) => {
  const {
      email, password ,
  } : reqBody = req.body ;
  
  //check the data weather you got the data or not
  if (!email || !password) {
    return res.status(400).send("Please entre a email and password");
  }

  //validate email
  if (!validateEmail(email)) {
    return res.status(400).send("Please provide valid email ");
  }

  //check the user in database

  try {
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      // Handle the case where user is not found
      throw new Error("User not found");
  }
    const isPasswordCorect = bcrypt.compare(password , user.password);
    console.log("password is correct");
    
    if (!isPasswordCorect) {
      return res.send("Invalid Password");
    }
    console.log(process.env.SECRET_KEY as string);
    //create the jwt tocken
    const jwtTocken = jwt.sign(
      { userId: user._id, email, role: user.role },
      process.env.SECRET_KEY as string,
      {
        expiresIn: 60 * 60,
      }
    );

    res.cookie("accessToken", jwtTocken);

    // return jwt token
    return res.send({
      message: "Logged In Successfully",
      jwtTocken,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).send("Something went wrong");
  }
};



