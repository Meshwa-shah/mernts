import { Express, Request, Response } from "express";
import { Router } from "express";
import { objectremove } from "../obcontroller/obremove";
import upload from "../multer";
const objectremoverouter = Router();

objectremoverouter.post('/removeobject', upload.single("image"), objectremove);

export default objectremoverouter