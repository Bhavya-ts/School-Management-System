import { Request, Response} from "express";
import { studentModel } from "../models/student.js";
import { teacherModel } from "../models/teacher.js";
import { StatusCodes } from "../enums.js";
import {reqWithPayload } from "../types/express.js";
type reqBodyStudent = {
  name: string;
  age: number;
  std: number;
  division: string;
  rollNo: number;
};
type reqfromPayload = {

  email: string;
  userId: string;
  role: string

}
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
    ...req,
  });
  studentData.save();
  return res
    .status(StatusCodes.OK)
    .json({ message: "Data Inserted", studentData });
  // console.log(name , age , std , division);
};

export const listStudents = async (req: reqWithPayload, res: Response) => {
  const { userId }: reqfromPayload = req.payload;

  if(!userId){
    console.log("Invalid User");
    return res.status(StatusCodes.NotFound).json({message: "Can't find user"});
  }
    const teacher = await teacherModel.findOne({
      userId 
    });
     
    if(!teacher){
      return res.json({status: StatusCodes.NotFound, message: "Can't find Teacher"})
    }
    const studentList = teacher.reduce((list: <array>, ))
    // if class and division
    // group students based on std and division

    res.json({ status: StatusCodes.OK, message: "Student list" });
}