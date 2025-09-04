import { Request, Response } from "express";
import fs from 'fs';
import { promises } from "dns";
import { ObModel } from "..";
import { UserModel } from "..";
import { Mongoose } from "mongoose";
import cloudinary from "../cloudinary";
import upload from "../multer";

export const objectremove = async (req: Request, res: Response): Promise<void> => {
    const file = req.file;
    const{ prompt, type, name } = req.body;
    try{
      const Image = await cloudinary.uploader.upload((req.file as Express.Multer.File).path, {
        folder: "uploads/",
      });
     const removedobject = cloudinary.url(Image.public_id, {
        transformation: [{effect: `gen_remove:${prompt}`}],
        resource_type: 'image'
     });
     
      fs.unlinkSync((req.file as Express.Multer.File).path);
      const obremove = new ObModel({
        prompt: prompt,
        type: type,
        image: {
          url: removedobject
        }
      });
      await obremove.save();

      if(obremove){
           const update = await UserModel.findOneAndUpdate(
            {name: name},
            {$push: {"Ob": obremove._id}},
            {new: true}
        )
        res.json({success: true, user: update, data: obremove});
      }
      else{
         res.json({success: false, message: "Sorry something went wrong"});
      }
    }
    catch(err){
      res.status(501).send(err);
    }
}