import OpenAI from "openai";
import { Request, Response } from "express";
import { promises } from "dns";
import { Titlemodel } from "..";
import { UserModel } from "..";
import { Mongoose } from "mongoose";

const AI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateTitle = async (req: Request, res: Response): Promise<void> => {
     
try{
 const{ prompt,  type, topic, name } = req.body;
 const mainprompt = `generate a blog title on "${prompt}" on the topic of "${topic}"`
 const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",  
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: mainprompt}
      ],
      temperature: 0.7,
      max_tokens: 100
});
const content = response.choices[0]?.message.content
 const title = new Titlemodel({
         prompt: prompt,
         type: type,
         res: content
})
    await title.save();
const update = await UserModel.findOneAndUpdate(
     {name: name},
     {$push: {"Title" : title._id}},
     {new: true}
)
if(update){
  res.json({success: true, user: update, data: title});
}
else{
 res.json({success: false, message: "sorry try again"});
}
//  res.json({successs: true, data: content});

}
catch(err){
     res.status(501).send(err)
}

}