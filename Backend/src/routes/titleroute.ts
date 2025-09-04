import { Express, Request, Response } from "express";
import { Router } from "express";
import { generateTitle } from "../titlecontroller/title";
const titlerouter = Router()

titlerouter.post('/generatetitle', generateTitle);

export default titlerouter