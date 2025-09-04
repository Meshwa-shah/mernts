"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_1 = require("../blogcontroller/blog");
const blogrouter = (0, express_1.Router)();
blogrouter.post('/generateblog', blog_1.generateBlog);
exports.default = blogrouter;
//# sourceMappingURL=routess.js.map