import { Request, Response } from "express";
import fs from 'fs';
import { promises } from "dns";
import { BgModel } from "..";
import { UserModel } from "..";
import { Mongoose } from "mongoose";
import cloudinary from "../cloudinary";
import upload from "../multer";
export const backgroundremove = async (req: Request, res: Response): Promise<void> => {
   const file = req.file;
   const {type, name} = req.body
   try{
      const removedImage = await cloudinary.uploader.upload((req.file as Express.Multer.File).path, {
         folder: "uploads/",
         transformation: [
            {
               effect: `background_removal`,
               background_removal: `remove_the_background`
            }
         ]
      });
      fs.unlinkSync((req.file as Express.Multer.File).path);
      const bgremoved = new BgModel({
         type: type,
         image:{
            url: removedImage.url,
            public_id: removedImage.public_id,
            secure_url: removedImage.secure_url
         }
      });
      await bgremoved.save();
      if(bgremoved){
         const update = await UserModel.findOneAndUpdate(
            {name: name},
            {$push: {"Bg": bgremoved._id}},
            {new: true}
         )
         res.json({success: true, user: update, data: bgremoved});
      }
      else{
         res.json({success: false, message: "Sorry something went wrong"});
      }
   }
   catch(err){
    res.status(501).send(err);
   }
}