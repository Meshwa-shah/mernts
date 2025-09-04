"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ResumeModel = exports.ObModel = exports.BgModel = exports.Imagemodel = exports.Titlemodel = exports.Blogmodel = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = require("./models/model");
const routess_1 = __importDefault(require("./routes/routess"));
const app = (0, express_1.default)();
const secretkey = "your-secret-key";
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
dotenv_1.default.config({ path: '.env' });
const PORT = Number(process.env.PORT) | 8080;
const url = String(process.env.MONGO_URL);
mongoose_1.default.connect(url)
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log(err));
console.log(url);
exports.Blogmodel = mongoose_1.default.model('Blog', model_1.BlogSchema);
exports.Titlemodel = mongoose_1.default.model('Title', model_1.TitleSchema);
exports.Imagemodel = mongoose_1.default.model('Image', model_1.ImageSchema);
exports.BgModel = mongoose_1.default.model('Bg', model_1.BgSchema);
exports.ObModel = mongoose_1.default.model('Ob', model_1.ObSchema);
exports.ResumeModel = mongoose_1.default.model('Resume', model_1.ResumeSchema);
exports.UserModel = mongoose_1.default.model('User', model_1.UserSchema);
app.use('/blog', routess_1.default);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map