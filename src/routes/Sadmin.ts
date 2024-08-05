import express from "express";
import {addSubject,addDivision,addTeacher,assignClasssToTeacher,assignSubjectToTeacher} from "../controllers/sadmin.js";
import { is_auth } from "../middlewares/jwtvarify.js";
import {listStdSubject} from "../controllers/public.js";

const router = express.Router();
router.post("/addTeachers",is_auth,addTeacher );
router.post("/addSubject" ,is_auth,addSubject );
router.post("/addDivision",is_auth,addDivision);
router.get("/listStdSubject",is_auth,listStdSubject);
router.post("/assignClasssToTeacher",is_auth,assignClasssToTeacher);
router.post("/assignSubjectToTeacher",is_auth,assignSubjectToTeacher);


export const sadminRouter = router;
