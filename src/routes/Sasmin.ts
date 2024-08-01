import express from "express";
import {addTeacher} from "../controllers/sadmin.js";
import { is_auth } from "../middlewares/jwtvarify.js";
const router = express.Router();
router.post("/addTeachers",is_auth,addTeacher );

export const sadminRouter = router;
