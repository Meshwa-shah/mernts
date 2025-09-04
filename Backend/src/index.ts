import express, { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import cloudinary from "./cloudinary.ts";
import path from "path";
import upload from "./multer.ts";
import cors from 'cors';
import multer from 'multer';
import mongoose from "mongoose";
import { log } from "console";
import cron from 'node-cron';
import { BlogSchema, TitleSchema,ImageSchema,  BgSchema, ObSchema, ResumeSchema, UserSchema } from "./models/model.ts";
import nodeCron from "node-cron";
import blogrouter from "./routes/blogroute.ts";
import adduserrouter from "./routes/userroute.ts";
import titlerouter from "./routes/titleroute.ts";
import bgremoverouter from "./routes/bgremoveroute.ts";
import generateimgroute from "./routes/imagenroute.ts";
import objectremoverouter from "./routes/obremoveroute.ts";
import resumerouter from "./routes/resumerouter.ts";
const app = express();

const secretkey: string = "your-secret-key";
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

const PORT: number = Number(process.env.PORT) | 8080;
const url: string =String(process.env.MONGO_URL);
mongoose.connect(url)
.then(() => console.log('Mongodb connected'))
.catch((err) => console.log(err));



export const Blogmodel = mongoose.model('Blog', BlogSchema);
export const Titlemodel = mongoose.model('Title', TitleSchema);
export const Imagemodel  = mongoose.model('Image', ImageSchema);
export const BgModel  = mongoose.model('Bg', BgSchema);
export const ObModel  = mongoose.model('Ob', ObSchema);
export const ResumeModel = mongoose.model('Resume', ResumeSchema);
export const UserModel  = mongoose.model('User', UserSchema);

app.use("/", blogrouter);
app.use('/', adduserrouter);
app.use('/', titlerouter);
app.use('/', bgremoverouter);
app.use('/', generateimgroute);
app.use('/', objectremoverouter);
app.use("/", resumerouter);
app.get('/set', async (req: Request, res: Response): Promise<void> => {
  
  //      {name: "Meshwa Shah"},
  //      {$set: {"profile": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMDhZOXlrdVdNcWxRTnAybU1LaVF0bkdWaTAifQ"}},
  //      {new: true}
  //   )
  //   if(upd){
  //       res.send(upd);
  //   }
  //   const find = await Imagemodel.findById({_id: '68a703746229f89305de29a6'});

  //  const upd = await UserModel.updateMany(
  //   {},
  //   {$set: {plan: "Free", date: "none"}}
  //  )

  // if(upd){
  //   res.send(upd)
  // }
  // const upd = await Imagemodel.findByIdAndUpdate(
  //   {_id: '68ab2b08bc52d41ad2b48ef2'},
  //   {$set: {"likes": 0}},
  //   {new: true}
  // )
  // res.send(upd)

})

app.post('/find', async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  try{
  const finduser = await UserModel.findOne({name: name})
  .populate("Blog")
  .populate("Title")
  .populate("Resume")

  if(finduser){
    res.json({success: true, blog: finduser.Blog, title: finduser.Title, resume: finduser.Resume, plan: finduser.plan})
  }
 else{
  res.json({success: false})
 }
}
  catch(err){
    res.status(501).send(err);
  }
});

app.post('/log', async (req: Request, res: Response): Promise<void> => {
  const {email, password} = req.body;
  try{
    const finduser = await UserModel.findOne({ $and: [
      {email: email},
      {password: password}
    ]});
   if(finduser){
     res.json({success: true, user: finduser});
   }
   else{
    res.json({success: false, message: "Wrong email or password"});
   }
  }
  catch(err){
    res.status(501).send(err)
  }
});

app.get('/findimg', async (req: Request, res:Response): Promise<void> => {
  try{
  const findimg = await Imagemodel.find({publish: true});
  if(findimg){
    res.json({success: true, data: findimg});
  }
  else{
    res.json({success: true, message: "something went wrong"});
  }
  }
  catch(err){
    res.status(501).send(err);
  }
})

app.post('/dislike', async (req: Request, res: Response): Promise<void> => {
 const{name, id} = req.body;
 try{
   const [dec, remove] = await Promise.all([
    await Imagemodel.findByIdAndUpdate(
      {_id: id},
      {$inc: {"likes": -1}},
      {new: true}
    ),
    await Imagemodel.findByIdAndUpdate(
      {_id: id},
      {$pull: {"likedby": name}},
      {new: true}
    )
    
   ])

   if(dec && remove){
     const find = await Imagemodel.find({});
     res.json({success: true, data: find, message: "creation disliked"});
   }
   else{
     res.json({success: false, message: "sorry something went wrong"});
   }
 }
 catch(err){
  res.status(501).send(err);
 }
});

app.post('/likes', async (req: Request, res: Response): Promise<void> => {

   const{name, id} = req.body;
 try{
   const [inc, add] = await Promise.all([
    await Imagemodel.findByIdAndUpdate(
      {_id: id},
      {$inc: {"likes": 1}},
      {new: true}
    ),
    await Imagemodel.findByIdAndUpdate(
      {_id: id},
      {$push: {"likedby": name}},
      {new: true}
    )
    
   ])

   if(inc && add){
     const find = await Imagemodel.find({});
     res.json({success: true, data: find, message: "creation liked"});
   }
   else{
     res.json({success: false, message: "sorry something went wrong"});
   }
 }
 catch(err){
  res.status(501).send(err);
 }
});

app.post('/plan', async(req: Request, res: Response) => {
 const {name} = req.body;
 try{
   const d: number = Date.now();
   const date: Date = new Date(d);
   const set: string = date.toString().slice(0, 15);
   
   const change = await UserModel.findOneAndUpdate(
    {name: name},
    {$set: {"plan": "Premium", "date": set}},
    {new: true}
   );
    if(change){
      res.json({success: true, data: change, message: "Your plan changed"});
    }

    else{
      res.json({success: false, message: "something went wrong"});
    }
  }

 catch(err){
  res.status(501).send(err);
 }
})


app.post('/setplan', async(req: Request, res: Response) => {
  try{
        const{name} = req.body;
        const find = await UserModel.find({name: name});
        if(find){
          res.json({success: true, data: find})
        }
       else{
        res.json({success: false, message: "You are not logged in "});
       }
  }
  catch(err: unknown){
    res.status(500).send(err as string);
  }
})
// async function schedule(req: Request, res: Response){
//   const find = await Imagemodel.find({});
//   console.log(find);
// }

// cron.schedule('0 10 * * *', async() => {
//  try{
//     const d: number = Date.now();
//     const date: Date = new Date(d);
//      const d2: Date = new Date(date.setMonth(date.getMonth() + 1));
//      const set: string = date.toString().slice(0, 15);
//     const change = await UserModel.updateMany(
//       {date: set},
//       {$set: {"plan": "Free", "date": "none"}}
//     )
//     // if(change){
//     //   console.log(change);
//     // }
//  }
//  catch(err){
//   console.log(err);
//  }
// });

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});