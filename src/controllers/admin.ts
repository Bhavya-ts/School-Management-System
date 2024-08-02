import { Request, Response, NextFunction } from "express";
import { studentModel } from "../models/student.js";
import { StatusCodes } from "../enums.js";
type reqBodyStudent = {
  name: string;
  age: number;
  std: number;
  division: string;
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
    ...req,
  });
  studentData.save();
  return res
    .status(StatusCodes.OK)
    .json({ message: "Data Inserted", studentData });
  // console.log(name , age , std , division);
};