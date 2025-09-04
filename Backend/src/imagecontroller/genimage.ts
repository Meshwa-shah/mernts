import { Request, Response } from "express";
import { promises } from "dns";
import { Imagemodel } from "..";
import { UserModel } from "..";
import { Mongoose } from "mongoose";
import dotenv from 'dotenv';
import cloudinary from "../cloudinary";
dotenv.config();
import axios from "axios";
export const generateImage = async (req: Request, res: Response): Promise<void> => {
 try{
   const {type, prompt, publish, style, name} = req.body;
   const mainprompt = `generate an image on the topic of "${prompt}" in ${style} style`;
   const formdata = new FormData();
   formdata.append("prompt", mainprompt);
   const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata , {
    headers: {'x-api-key' : String(process.env.CLIPDROP_API_KEY),},
    responseType: "arraybuffer"
   });
   const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
   
   const genimage = await cloudinary.uploader.upload(base64Image);
   
   const image = new Imagemodel({
    prompt: prompt,
    type: type,
    publish: publish,
    image: {
      url: genimage.url,
      public_id: genimage.public_id,
      secure_url: genimage.secure_url
    }
   })
   await image.save();

   if(image){
    const update = await UserModel.findOneAndUpdate(
      {name: name},
      {$push: {"Image": image._id}},
      {new: true}
    )
    res.json({success: true, user: update, data: image});
   }
   else{
    res.json({success: false, message: "Sorry something went wrong"});
   }
 }
 catch(err){
  res.status(501).send(err);
 }
}