import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { userModel } from "../models/user.js";
import { Request, Response } from "express";
import { validateEmail } from "../utills/emailValidator.js";
import { SubjectDetails } from "../models/subject.js";
import { sendResetPasswordMail } from "../utills/mailer.js";

type reqBody = {
  email: string;
  password: string;
};

type reqListSubjectBody = {
  std: number;
  div: string;
};

export const sigin = async (req: Request, res: Response) => {
  const { email, password }: reqBody = req.body;

  //check the data weather you got the data or not
  if (!email || !password) {
    return res.status(400).send("Please entre a email and password");
  }

  if (!validateEmail(email)) {
    return res.status(400).send("Please provide valid email ");
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
      // Handle the case where user is not found
      throw new Error("User not found");
    }
    const isPasswordCorect = bcrypt.compare(password, user.password);

    if (!isPasswordCorect) {
      return res.send("Invalid Password");
    }
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

export const listStdSubject = async (req: Request, res: Response) => {
  const { std, div }: reqListSubjectBody = req.body;

  if (!std || !div) {
    res.status(400).send("enter a details first");
  }
  try {
    const stdSubjectDetails = await SubjectDetails.find({ std, division: div });
    res.status(200).send(stdSubjectDetails);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const requestResetPassword = async (req: Request, res: Response) => {
  const {
    body: { email },
  } = req;
  const token = jwt.sign({ email }, "SECRETKEY,", { expiresIn: "1h" });
  sendResetPasswordMail(email, token);
  res.send("Check your mail for resetting password.");
};
