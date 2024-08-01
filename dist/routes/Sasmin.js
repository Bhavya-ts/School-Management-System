import express from "express";
import { addTeacher } from "../controllers/sadmin.js";
import { is_auth } from "../middlewares/jwtvarify.js";
var router = express.Router();
router.post("/addTeachers", is_auth, addTeacher);
// router.post("/")
export var sadminRouter = router;
