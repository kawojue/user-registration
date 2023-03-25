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
exports.handleForgotPswd = void 0;
const mailer_1 = __importDefault(require("../config/mailer"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const manageOTP_1 = require("../config/manageOTP");
const asyncHandler = require('express-async-handler');
exports.handleForgotPswd = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { OTP, now } = (0, manageOTP_1.generateOTP)();
    const mail = email === null || email === void 0 ? void 0 : email.toLowerCase().trim();
    const exists = yield userSchema_1.default.findOne({ 'mail.email': mail }).exec();
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address.'
        });
    }
    if (!exists) {
        return res.status(401).json({
            success: false,
            message: 'Account does not exist.'
        });
    }
    yield (0, mailer_1.default)("Always Appear", mail, "Forgot Password", `Code: ${OTP}`);
    res.status(200).json({
        success: true,
        totp: OTP,
        date: now
    });
}));
//# sourceMappingURL=forgotPswdController.js.map