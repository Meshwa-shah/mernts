import { Express, Request, Response } from "express";
import { Router } from "express";
import { backgroundremove } from "../bgcontroller/bgremove";
import upload from "../multer";
const bgremoverouter = Router();

bgremoverouter.post('/removebg', upload.single("image") ,backgroundremove);

export default bgremoverouter