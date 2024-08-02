<<<<<<< HEAD
export var addStudent = function (req, res, next) {
    var _a = req.body, name = _a.name, age = _a.age, std = _a.std, division = _a.division;
=======
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { studentModel } from "../models/student.js";
import { StatusCodes } from "../enums.js";
export var addStudent = function (req, res, next) {
    var _a = req.body, name = _a.name, std = _a.std, division = _a.division;
    if (!name) {
        StatusCodes.NotFound;
        return res.status(StatusCodes.BadRequest).send("Please enter the name..");
    }
    if (!std || !division) {
        return res
            .status(StatusCodes.BadRequest)
            .send("Please enter the standard and division..");
    }
    var studentData = new studentModel(__assign({}, req));
    studentData.save();
    return res
        .status(StatusCodes.OK)
        .json({ message: "Data Inserted", studentData: studentData });
>>>>>>> e606182018d346dd6a62b148d4a7db8beff29d01
    // console.log(name , age , std , division);
};
