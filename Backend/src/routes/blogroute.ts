import { Express, Request, Response } from "express";
import { Router } from "express";
import { generateBlog } from "../blogcontroller/blog.ts";

const blogrouter = Router();

blogrouter.post('/generateblog', generateBlog);

export default blogrouter
