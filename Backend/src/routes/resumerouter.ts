import { Express, Request, Response } from "express";
import { Router } from "express";
import { resumereview } from "../resumecontroller/resume";
import upload from "../multer";

const resumerouter = Router();

resumerouter.post('/reviewresume', upload.single("resume"), resumereview);

export default resumerouter;