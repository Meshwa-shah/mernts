"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.ResumeSchema = exports.ObSchema = exports.BgSchema = exports.ImageSchema = exports.TitleSchema = exports.BlogSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.BlogSchema = new mongoose_1.default.Schema({
    prompt: String,
    type: String,
    res: String
});
exports.TitleSchema = new mongoose_1.default.Schema({
    prompt: String,
    type: String,
    res: String
});
exports.ImageSchema = new mongoose_1.default.Schema({
    prompt: String,
    type: String,
    image: {
        url: String,
        public_id: String
    }
});
exports.BgSchema = new mongoose_1.default.Schema({
    prompt: String,
    type: String,
    image: {
        url: String,
        public_id: String
    }
});
exports.ObSchema = new mongoose_1.default.Schema({
    prompt: String,
    type: String,
    image: {
        url: String,
        public_id: String
    }
});
exports.ResumeSchema = new mongoose_1.default.Schema({
    prompt: String,
    type: String,
    res: String
});
exports.UserSchema = new mongoose_1.default.Schema({
    name: String,
    Blog: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Blogmodel'
        }
    ],
    Title: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Titlemodel'
        }
    ],
    Image: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Imagemodel'
        }
    ],
    Bg: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'BgModel'
        }
    ],
    Ob: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'ObModel'
        }
    ],
    Resume: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'ResumeModel'
        }
    ]
});
//# sourceMappingURL=model.js.map