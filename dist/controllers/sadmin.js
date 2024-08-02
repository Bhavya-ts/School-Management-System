var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { validateEmail } from "../utills/emailValidator.js";
import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import { SubjectDetails, Subject } from "../models/subject.js";
export var addTeacher = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, salt, passwordHash, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email;
                if (!name || !email) {
                    res.send("please provide the details");
                }
                if (!validateEmail(email)) {
                    res.send("please provide valid email");
                }
                password = "123456";
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 2:
                passwordHash = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, new userModel({ name: name, password: passwordHash, email: email }).save()];
            case 4:
                user = _b.sent();
                console.log(user);
                res.send("user create successfully ");
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.send("user not added please start again");
                return [3 /*break*/, 6];
            case 6:
                console.log(name);
                return [2 /*return*/];
        }
    });
}); };
export var addSubject = function (req, res, next) {
    var _a = req.body, std = _a.std, subName = _a.subName, topics = _a.topics;
    console.log("topic lsi t: ", topics);
    if (!std || !subName || !topics) {
        res.status(400).send("enter a details perfectly");
    }
    try {
        var topicObjects = topics.map(function (topicName) { return ({
            topicName: topicName
        }); });
        var subject = new Subject({
            std: std,
            subName: subName,
            topics: topicObjects
        });
        subject.save();
        res.status(200).send(subject);
    }
    catch (error) {
        throw new Error(error);
    }
};
export var addDivision = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, std, div, subjects, subjectDetails, subjectDetail, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, std = _a.std, div = _a.div;
                // Validate input
                if (!std || !div) {
                    return [2 /*return*/, res.status(400).send('Please provide all required details.')];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Subject.find({ std: std }).exec()];
            case 2:
                subjects = _b.sent();
                subjectDetails = subjects.map(function (subject) { return ({
                    subjectName: subject.subName,
                    topics: subject.topics.map(function (topic) { return ({
                        topicName: topic.topicName
                    }); })
                }); });
                subjectDetail = new SubjectDetails({ std: std, division: div, subjects: subjectDetails });
                subjectDetail.save();
                res.status(200).send(subjectDetail);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                throw new Error(error_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
