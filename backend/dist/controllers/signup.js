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
exports.handleSignup = void 0;
const bcrypt = __importStar(require("bcrypt"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const asyncHandler = require('express-async-handler');
exports.handleSignup = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pswd, deviceInfo } = req.body;
    const mail = email === null || email === void 0 ? void 0 : email.toLowerCase().trim();
    const existingEmail = yield userSchema_1.default.findOne({ 'mail.email': mail }).exec();
    if (!pswd || !mail)
        return res.sendStatus(400);
    if (existingEmail)
        return res.sendStatus(401);
    const hashedPswd = yield bcrypt.hash(pswd, 12);
    yield userSchema_1.default.create({
        mail: {
            email: mail
        },
        password: hashedPswd,
        deviceInfo
    });
    res.status(201).json({
        success: true,
        email: mail
    });
}));
//# sourceMappingURL=signup.js.map