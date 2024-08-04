import { studentModel } from "../models/student.js";
import { StatusCodes } from "../enums.js";
export const addStudent = (req, res) => {
    const { name, std, division } = req.body;
    if (!name) {
        return res.status(StatusCodes.BadRequest).send("Please enter the name..");
    }
    if (!std || !division) {
        return res
            .status(StatusCodes.BadRequest)
            .send("Please enter the standard and division..");
    }
    const studentData = new studentModel({
        name, std
    });
    studentData.save();
    return res
        .status(StatusCodes.OK)
        .json({ message: "Data Inserted", studentData });
    // console.log(name , age , std , division);
};
export const addBodyMeasurement = async (req, res, next) => {
    const { studentId, month, year, height, weight } = req.body;
    if (!studentId || !month || !year || !height || !weight) {
        res.status(StatusCodes.BadRequest).send("enter a proper details ");
    }
    try {
        const student = await studentModel.findOne({ _id: studentId });
        if (!student) {
            res.send(StatusCodes["InternalServerError"]).send("user not found");
        }
        console.log(student);
        const BodyMeasurement = {
            month, year, height, weight
        };
        student === null || student === void 0 ? void 0 : student.body_measurement.push(BodyMeasurement);
        await (student === null || student === void 0 ? void 0 : student.save());
        console.log(BodyMeasurement);
        res.send(student);
    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.InternalServerError).send("Error!......");
    }
};
export const addAttendance = (req, res, next) => {
    const { std, div, PresentStudentIds } = req.body;
    const date = new Date().toLocaleDateString();
    const year = new Date().getFullYear();
    // const year = ne
    if (!std || !div || !PresentStudentIds) {
        res.send(StatusCodes.BadRequest).send("Please provide a valid data...");
    }
    console.log("current date is : ", date);
};
