import { Request, Response, NextFunction } from "express";
import { studentModel } from "../models/student.js";
import { StatusCodes } from "../enums.js";
import {SubjectDetails} from "../models/subject.js";
import { attendanceModel } from "../models/attendance.js";

import { Subject } from "../models/subject.js";
type reqBodyStudent = {
  name: string;
  age: number;
  std: number;
  division: string;
};

type reqBodyOtherDetail =  {
  studentId:string,
  month: string,
  year: number,
  height: number,
  weight: number,
}
interface BodyMeasurement {
  month: string;
  year: number;
  height: number;
  weight: number;
}

type reqBodyEditTopic= {
  std : number; 
  div:string;  
  subjectId:string; 
  topicID:string ;
  status:number
};
export const addStudent = (req: Request, res: Response) => {
  const { name, std, division }: reqBodyStudent = req.body;
  if (!name) {
    return res.status(StatusCodes.BadRequest).send("Please enter the name..");
  }
  if (!std || !division) {
    return res
      .status(StatusCodes.BadRequest)
      .send("Please enter the standard and division..");
  }
  const studentData = new studentModel({
    name,std
  });
  studentData.save();
  return res
    .status(StatusCodes.OK)
    .json({ message: "Data Inserted", studentData });
  // console.log(name , age , std , division);
};

export const addBodyMeasurement = async(req: Request, res:Response, next:NextFunction)=>{
  const {studentId , month , year , height , weight} : reqBodyOtherDetail =req.body; 

  if(!studentId || !month || !year || !height || !weight){
    return res.status(StatusCodes.BadRequest).send("enter a proper details ");
  }

  try {
      const student  = await studentModel.findOne({_id:studentId}) ;
      if(!student){
        return res.send(StatusCodes["InternalServerError"]).send("user not found");
      }
      console.log(student);
      

      const BodyMeasurement = {
        month,year,height,weight
      }  
      student?.body_measurement.push(BodyMeasurement);

      await student?.save();
      console.log(BodyMeasurement);
      return res.send(student);
      

  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.InternalServerError).send("Error!......");
  }
}


//attendance update 
export const addAttendance = async (req:Request , res:Response , next:NextFunction)=>{
  const {std, div , studentIdsAbsent} = req.body;
  const date = new Date().toLocaleDateString();
  const year = new Date().getFullYear();



  if(!std || !div || !studentIdsAbsent){
    return res.send(StatusCodes.BadRequest).send("Please provide a valid data...");
  }

  
  try {
    const attendanceDoc  = await attendanceModel.findOne({std,div,year});
    if(!attendanceDoc){
      return res.status(StatusCodes.BadRequest).send("class not found");
    }
    
    attendanceDoc?.attendanceRecords.forEach(record => {
      const isStudentAbsent = studentIdsAbsent.includes(record.studentId);
      const datewiseEntry = record.datewiseList.find(entry => entry.date === date);

      if (datewiseEntry) {
        datewiseEntry.present = isStudentAbsent ? 0 : 1; 
      } else {
          // Add new datewise entry
          record.datewiseList.push({ date, present: isStudentAbsent ? 0 : 1 });
      }
    });
    await attendanceDoc?.save();
    return res.status(StatusCodes.OK).send("Attendance update successfully...");

    
  } catch (error) {
    return res.status(StatusCodes.InternalServerError).send('Error updating attendance.');
  }

}

export const editTopicStatus = async (req:Request , res:Response , next:NextFunction) => {
  const {std , div,  subjectId ,topicID, status} :reqBodyEditTopic= req.body;

  if(!std || !div || !subjectId || !topicID || !status){
    return res.send(StatusCodes.BadRequest).send("Please provide a valid data...");
  }

  try {
    const subjectDoc = await SubjectDetails.findOne({std,division:div,});
    if(!subjectDoc){
      return res.status(StatusCodes.BadRequest).send("Not found perticular class into database.....");
    }

    const subject = subjectDoc?.subjects.find(data => data.subjectId === subjectId);
    if(!subject){
      return res.send(StatusCodes.InternalServerError).send("subject not found...");
    }
    console.log("subject",subject.topics);
    const topic = subject?.topics.find(data=> data.topicId === topicID);
    if(!topic){
      return res.status(StatusCodes.BadRequest).send("Not found perticular topic into database.....");
    }
    topic!.completed = status;

    console.log(topic)
    
    
    await subjectDoc?.save();
    return res.status(StatusCodes.OK).send("topic status update successfully...");
    
  } catch (error) {
    return res.status(StatusCodes.InternalServerError).send('Error updating status of topic....');
  }

}