import { Request , Response , NextFunction } from "express"
import {validateEmail} from "../utills/emailValidator.js";
import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import {teacherModel} from "../models/teacher.js";
import { StatusCodes } from "../enums.js";
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

type subjectAssignment = {
    teacherId:string,
    std:number,
    div:string,
    subjectId:string
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
        const teacher = await new teacherModel({techerId:user._id}).save();
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

  export const assignClasssToTeacher = async (req:Request , res:Response , next:NextFunction)=>{
    const {teacherId, std , div } :subjectAssignment = req.body;
    
    if(!teacherId || !std || !div ) {
      res.status(StatusCodes.BadRequest).send("Provide a proper data first");
    }
  
    try {
    const alreadyAssigned = await teacherModel.findOne({classTeacherDiv:div , classTeacherStd : std});
        if(alreadyAssigned){
            res.status(StatusCodes.InternalServerError).send("Already assigned this std and div.....")
        }
      const teacherDoc = await teacherModel.findOne({techerId:teacherId});

      if(!teacherDoc){
        res.status(StatusCodes.InternalServerError).send("Teacher with this Id not found .....");
      }
    teacherDoc!.classTeacherStd = std;
    teacherDoc!.classTeacherDiv = div;

    await teacherDoc?.save();

    res.status(StatusCodes.OK).send("class assigned successfully....");
    } catch (error) {
      res.status(StatusCodes.InternalServerError).send('Error assiging class to teacher....');
    }
  };

  export const assignSubjectToTeacher = async (req:Request , res:Response , next:NextFunction)=>{
    const {teacherId, std , div , subjectId} :subjectAssignment = req.body;
    
    if(!teacherId || !std || !div ||!subjectId) {
      res.status(StatusCodes.BadRequest).send("Provide a proper data first");
    }
  
    try {
      const teacherDoc = await teacherModel.findOne({techerId:teacherId});
      
      if(!teacherDoc){
        res.status(StatusCodes.InternalServerError).send("Teacher with this Id not found .....")
      }
     const subject = teacherDoc?.assignedSubject.find(data => data.subjectId === subjectId && data.std === std && data.div === div);
  
     if(!subject){
      teacherDoc?.assignedSubject.push({std,div,subjectId});
      await teacherDoc?.save();
      res.status(StatusCodes.OK).send("class assigned successfully....");
     }
    } catch (error) {
      res.status(StatusCodes.InternalServerError).send('Error assiging subject to teacher....');
    }
  }