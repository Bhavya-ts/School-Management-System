import express from "express";
import {addStudent} from "../controllers/admin.js";
import {is_auth} from "../middlewares/jwtvarify.js"
const router = express.Router();
router.post("./addStudent",is_auth,addStudent );

// router.post("");
export const adminRouter = router;
