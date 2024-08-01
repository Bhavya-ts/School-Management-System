import express from "express";
import { sigin } from "../controllers/public.js";
var router = express.Router();
router.post("/signin", sigin);
export var publicRouter = router;
