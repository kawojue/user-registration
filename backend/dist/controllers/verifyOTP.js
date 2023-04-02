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
exports.verify = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const asyncHandler = require('express-async-handler');
exports.verify = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { userId, otp } = req.body;
    otp = otp === null || otp === void 0 ? void 0 : otp.trim();
    userId = (_a = userId === null || userId === void 0 ? void 0 : userId.trim()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const getUser = yield userSchema_1.default.findOne({ 'mail.email': userId });
    const { totp, totpDate } = getUser === null || getUser === void 0 ? void 0 : getUser.manageOTP;
    const expiry = totpDate + 60 * 60 * 1000; // after 1hr
    if (!getUser || !userId) {
        return res.status(404).json({
            message: "Account not found!"
        });
    }
    if (expiry < Date.now()) {
        return res.status(400).json({
            message: "OTP Expired."
        });
    }
    if (totp !== otp) {
        return res.status(401).json({
            message: "Incorrect OTP"
        });
    }
    res.status(200).json({
        verified: true,
        userId
    });
}));
//# sourceMappingURL=verifyOTP.js.map