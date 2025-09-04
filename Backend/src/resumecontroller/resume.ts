import { Request, Response } from "express";
import fs from 'fs';
import { promises } from "dns";
import { ResumeModel } from "..";
import { UserModel } from "..";
import { Mongoose } from "mongoose";
import upload from "../multer";
import OpenAI from "openai";
import pdf from 'pdf-parse';

const AI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const resumereview = async (req: Request, res: Response): Promise<void> => {
 try{
  const file = req.file;
  const {type, name} = req.body;

  
  const databuffer = fs.readFileSync((req.file as Express.Multer.File).path);
  const parsedpdf = await pdf(databuffer);
  if(parsedpdf.text.trim().length < 50){
     fs.unlinkSync((req.file as Express.Multer.File).path);
     res.json({success: false, message: "please try standard pdf instead of image pdf"});

  }
  else{
  const prompt = `Review then following resume and provide constructive feedback
  on its strengths, weaknesses and areas for improvement. Resume 
  Content:\n\n${parsedpdf.text}`;
 
   const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",  
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt}
      ],
      temperature: 0.7,
      max_tokens: 1000
});
const content = response.choices[0]?.message.content;

fs.unlinkSync((req.file as Express.Multer.File).path);

 const resume = new ResumeModel({
  prompt: "Review the resume",
  type: type,
  res: content
 });

 await resume.save();
 if(resume){
  const update = await UserModel.findOneAndUpdate(
    {name: name},
    {$push: {"Resume": resume._id}},
    {new: true}
  )
   res.json({success: true, user: update, data: resume});
 }
 else{
  res.json({success: false, message: "something went wrong"});
 }
  }
 }
 
 catch(err){
    res.status(501).send(err);
 }
}