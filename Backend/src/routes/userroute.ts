import { Express, Request, Response } from "express";
import { Router } from "express";
import { AddUser } from "../User/adduser";
import upload from "../multer";
const adduserrouter = Router();

adduserrouter.post('/adduser', upload.single("image") , AddUser);

export default adduserrouter