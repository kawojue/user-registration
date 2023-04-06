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
exports.handleAccountSetup = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const asyncHandler = require('express-async-handler');
exports.handleAccountSetup = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let { username, verifyEmail, vCode } = req.body;
    username = (_a = username === null || username === void 0 ? void 0 : username.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    verifyEmail = (_b = verifyEmail === null || verifyEmail === void 0 ? void 0 : verifyEmail.trim()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    const userExists = yield userSchema_1.default.findOne({ username }).exec();
    const getUser = yield userSchema_1.default.findOne({ 'mail.email': verifyEmail }).exec();
    if (!username) {
        return res.status(400).json({
            message: "Invalid Input"
        });
    }
    if (!verifyEmail || !getUser) {
        return res.status(404).json({
            message: "Account not found."
        });
    }
    const totp = getUser.manageOTP.totp;
    const totpDate = getUser.manageOTP.totpDate;
    const expiry = totpDate + 60 * 60 * 1000;
    if (expiry < Date.now()) {
        getUser.manageOTP = {};
        yield getUser.save();
        return res.status(400).json({
            message: "OTP Expired."
        });
    }
    if (totp !== vCode) {
        return res.status(401).json({
            message: "Incorrect OTP"
        });
    }
    if (userExists) {
        return res.status(409).json({
            message: "Username taken."
        });
    }
    getUser.manageOTP = {};
    getUser.username = username;
    getUser.mail.isVerified = true;
    yield getUser.save();
    res.status(200).json({
        success: true,
        message: "Your email has been verified."
    });
}));
//# sourceMappingURL=accountSetup.js.map