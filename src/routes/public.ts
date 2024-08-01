import express from "express";
import {sigin} from "../controllers/public.js";

const router = express.Router();
router.post("/signin", sigin);

export const publicRouter = router;
