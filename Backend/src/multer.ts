import multer from "multer";
import path from "path";
import fs from 'fs';
const uploads = path.join(__dirname, '..' , "uploads");
if(!fs.existsSync(uploads)){
    fs.mkdirSync(uploads, {recursive: true});
    console.log("New folder created");
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({storage});

export default upload