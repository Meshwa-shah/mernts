import { Express } from "express";
import mongoose, {Schema, Document} from "mongoose";

export const BlogSchema: Schema = new mongoose.Schema({
    prompt: String,
    type: String,
    res: String
}, {timestamps: true});
export const TitleSchema: Schema = new mongoose.Schema({
    prompt: String,
    type: String,
    res: String
}, {timestamps: true});
export const ImageSchema: Schema = new mongoose.Schema({
    prompt: String,
    type: String,
    publish: Boolean,
    likedby: [String],
    likes: {
        type: Number,
        default: 0
    },
    image: {
        url: String,
        public_id: String,
        secure_url: String
    }
}, {timestamps: true})

export const BgSchema: Schema = new mongoose.Schema({
    type: String,
    image: {
        url: String,
        public_id: String,
        secure_url: String
    }
}, {timestamps: true});

export const ObSchema: Schema = new mongoose.Schema({
    prompt: String,
    type: String,
    image: {
        url: String
    }
}, {timestamps: true});
export const ResumeSchema: Schema = new mongoose.Schema({
    prompt: String,
    type: String,
    res: String
}, {timestamps: true});

export const UserSchema: Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profile: String,
    plan: {
     type: String,
     default: "Free"
    },
    date: {
      type: String,
      default: "none"
    },
    Blog: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Blog'
        }
    ],
    Title: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Title'
        }
    ],
    Image: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Image'
        }
    ],
    Bg: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Bg'
        }
    ],
    Ob:[
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Ob'
        }
    ],
    Resume: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume'
        }
    ]
}, {timestamps: true})

