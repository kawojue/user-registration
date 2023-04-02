"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer')))
        return res.sendStatus(401);
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, `${process.env.SECRET_ACCESS_TOKEN}`, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user.userInfo.userId;
        next();
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=verifyJWT.js.map