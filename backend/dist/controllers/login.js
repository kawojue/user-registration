"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.handleLogin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const corsOptions_1 = require("../config/corsOptions");
const mailer_1 = __importDefault(require("../config/mailer"));
const asyncHandler = require('express-async-handler');
dotenv_1.default.config();
const newCookie = process.env.NODE_ENV === 'production' ? {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    secure: true
} : {
    httpOnly: true,
    maxAge: 5 * 60 * 1000 // 5 mins
};
exports.handleLogin = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { user, pswd, deviceInfo } = req.body;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = EMAIL_REGEX.test(user);
    const userId = (_a = user === null || user === void 0 ? void 0 : user.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const { name: devName, os: devOs, version: devVersion } = deviceInfo;
    const existingUser = yield userSchema_1.default.findOne(isEmail ? { 'mail.email': userId } : { username: userId }).exec();
    if (!userId || !pswd || !existingUser) {
        return res.status(400).json({
            success: false,
            message: "Invalid user ID or password."
        });
    }
    const username = existingUser === null || existingUser === void 0 ? void 0 : existingUser.username;
    const { name: exDevName, os: exDevOs, version: exDevVersion } = existingUser === null || existingUser === void 0 ? void 0 : existingUser.deviceInfo;
    const checkPswd = yield bcrypt.compare(pswd, existingUser.password);
    if (!checkPswd) {
        return res.status(401).json({
            success: false,
            message: "Incorrect password."
        });
    }
    const roles = Object.values(existingUser.roles).filter(Boolean);
    const accessToken = jsonwebtoken_1.default.sign({
        "userInfo": {
            "userId": username,
            "roles": roles
        }
    }, `${process.env.SECRET_ACCESS_TOKEN}`, { expiresIn: '3m' });
    const refreshToken = jsonwebtoken_1.default.sign({ "userId": username }, `${process.env.SECRET_REFRESH_TOKEN}`, { expiresIn: '5d' });
    const text = `Hi ${username === null || username === void 0 ? void 0 : username.toUpperCase()},\n\n\nA successful login just occurred at ${devName === null || devName === void 0 ? void 0 : devName.toUpperCase()} ${devOs === null || devOs === void 0 ? void 0 : devOs.toUpperCase()} on ${new Date()}.\nIf you did not initiate this login, please visit ${corsOptions_1.allowedUrl}/account/password/reset to reset your password.`;
    const transportMail = {
        senderName: 'Kawojue Raheem',
        to: existingUser.mail.email,
        subject: 'Login Notification',
        text
    };
    if (existingUser.mail.isVerified) {
        if (devName !== exDevName || devOs !== exDevOs || devVersion !== exDevVersion) {
            yield (0, mailer_1.default)(transportMail);
        }
    }
    existingUser.deviceInfo = deviceInfo;
    existingUser.refreshToken = refreshToken;
    yield existingUser.save();
    res.cookie('loginCookie', refreshToken, newCookie);
    res.status(200).json({
        success: true,
        username,
        mail: existingUser.mail,
        accessToken,
        roles
    });
}));
//# sourceMappingURL=login.js.map