import express from "express";
import { sigin, requestResetPassword } from "../controllers/public.js";

const router = express.Router();
router.post("/signin", sigin);
router.post("/resetPassword", requestResetPassword);

export const publicRouter = router;
