"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRefreshToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler = require('express-async-handler');
dotenv_1.default.config();
exports.handleRefreshToken = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.auth))
        return res.sendStatus(401); // unauthorized
    const refreshToken = cookies.auth;
    const existingUser = yield userSchema_1.default.findOne({ refreshToken }).exec();
    if (!existingUser)
        return res.sendStatus(403); // forbidden
    const roles = Object.values(existingUser.roles).filter(Boolean);
    jsonwebtoken_1.default.verify(refreshToken, `${process.env.SECRET_REFRESH_TOKEN}`, (err, userInfo) => {
        if (err || userInfo.userId !== existingUser.username)
            return res.sendStatus(403);
        const accessToken = jsonwebtoken_1.default.sign({
            "userInfo": {
                "userId": userInfo.userId,
                "roles": roles
            }
        }, `${process.env.SECRET_ACCESS_TOKEN}`, { expiresIn: '3m' });
        res.status(200).json({ success: true, accessToken });
    });
}));
//# sourceMappingURL=refreshToken.js.map