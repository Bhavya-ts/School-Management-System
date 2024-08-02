import { Request , Response , NextFunction } from "express"
import {validateEmail} from "../utills/emailValidator.js";
import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import { SubjectDetails, Subject } from "../models/subject.js";
type reqBody = {
    name : string,
    email :string,
}

type reqBodySubject = {
    std : number,
    subName : string,
    topics : Array<Object>
}
type reqBodystd = {
    std : number,
    div : string
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
        res.send("user create successfully ");
    } catch (error) {
        res.send("user not added please start again");
    }
}


export const addSubject = (req:Request , res : Response , next :NextFunction)=>{
    
    const {std , subName , topics} : reqBodySubject= req.body;
    
    if(!std || !subName || !topics){
        res.status(400).send("enter a details perfectly");
    }
    try {
        const topicObjects = topics.map(topicName => ({
            topicName
          }));
        const subject = new Subject({
            std,subName , topics:topicObjects
        })
        subject.save()
        res.status(200).send(subject);
    } catch (error:any ) {
        throw new Error(error);
    }   
}

export const addDivision = async (req: Request, res: Response, next: NextFunction) => {
    const { std, div }: reqBodystd = req.body;
  
    // Validate input
    if (!std || !div) {
      return res.status(400).send('Please provide all required details.');
    }
  
    try {
      const subjects = await Subject.find({ std }).exec();
      
      const subjectDetails = subjects.map(subject => ({
        subjectName: subject.subName,
        topics: subject.topics.map(topic => ({
            topicName: topic.topicName
        }))
      }));
  
      const subjectDetail = new SubjectDetails({ std, division: div, subjects: subjectDetails });
      subjectDetail.save();
      res.status(200).send(subjectDetail);
    } catch (error:any ) {
        throw new Error(error);
    }
  };  