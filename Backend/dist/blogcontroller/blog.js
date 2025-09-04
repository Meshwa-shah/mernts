"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBlog = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: 'AIzaSyCqz3wf6-_vay5v6z6qR_sLI7jFkBVFi6I',
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
const generateBlog = async (req, res) => {
    try {
        const { prompt, length } = req.body;
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt
                },
            ],
            temperature: 0.7,
            max_tokens: length
        });
        const content = response?.choices[0]?.message?.content;
        if (content !== undefined) {
            res.json({ success: true, data: content });
        }
        else {
            res.json({ success: false, data: "sorry try again" });
        }
    }
    catch (err) {
        res.status(501).send(err);
    }
};
exports.generateBlog = generateBlog;
//# sourceMappingURL=blog.js.map