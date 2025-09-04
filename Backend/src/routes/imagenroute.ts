import { Express, Request, Response } from "express";
import { Router } from "express";
import { generateImage } from "../imagecontroller/genimage";

const generateimgroute = Router();

generateimgroute.post('/generateImage', generateImage);

export default generateimgroute
