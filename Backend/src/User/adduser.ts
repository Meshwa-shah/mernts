import { Request, Response } from "express";
import { Promise } from "mongoose";
import { Mongoose } from "mongoose";
import { UserModel } from "..";
import cloudinary from "../cloudinary";
import { profile } from "console";
import fs from 'fs';
export const AddUser = async (req: Request, res: Response): Promise<void> => {
   try{
        const file = req.file;
        const {name, email, password} = req.body;
        const find = await UserModel.findOne({$and: [
            {email: email},
            {passwod: password}
        ]});
        if(find){
            fs.unlinkSync((req.file as Express.Multer.File).path);
            res.json({success: false, message: "Email already exists"});
        }
        else{
        const upload = await cloudinary.uploader.upload((req.file as Express.Multer.File).path, {
          folder: "uploads/"
    });
        const add = new UserModel({
            name: name,
            email: email,
            password: password,
            profile: upload.url
        });
        await add.save();
        fs.unlinkSync((req.file as Express.Multer.File).path);
        if(add){
            res.json({success: true, user: add, message: `Welcome new user ${add.name}`});
        }
        else{
            res.json({success: false, message: "User not created"})
        }
   }
}
   catch(err){
     res.status(501).send(err);
   }
}