
import OpenAI from "openai";
import { Request, Response } from "express";
import { promises } from "dns";
import { Blogmodel } from "..";
import { UserModel } from "..";
import { Mongoose } from "mongoose";
const AI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateBlog = async (req: Request, res: Response): Promise<any> => {
     
try{
 const{ prompt, length, type, name , len} = req.body;
 const mainprompt = `generate a blog article on the topic of "${prompt} in ${len}"`
 const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",  
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: mainprompt }
      ],
      temperature: 0.7,
      max_tokens: length
});
const content = response.choices[0]?.message.content

 const bg = new Blogmodel({
         prompt: prompt,
         type: type,
        res: content
    })
    await bg.save();
  const update = await UserModel.findOneAndUpdate(
          {name: name},
          {$push: {"Blog" : bg._id}},
          {new: true}
     );
       if(update){
          res.json({success: true, user: update, data: bg});
       }
       else{
       res.json({success: false, message: "sorry try again"});
       }



//  res.json({successs: true, data: content});

}
catch(err){
     res.status(501).send(err);
}

}