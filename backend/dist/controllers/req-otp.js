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
exports.handleReqOTP = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const mailer_1 = __importDefault(require("../config/mailer"));
const manageOTP_1 = __importDefault(require("../config/manageOTP"));
const asyncHandler = require('express-async-handler');
const checkMail_1 = __importDefault(require("../config/checkMail"));
exports.handleReqOTP = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const mail = email === null || email === void 0 ? void 0 : email.toLowerCase().trim();
    const { totp, totpDate } = (0, manageOTP_1.default)();
    const exists = yield userSchema_1.default.findOne({ 'mail.email': mail }).exec();
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email address.'
        });
    }
    if (!exists) {
        return res.status(404).json({
            success: false,
            message: 'Account does not exist.'
        });
    }
    const { valid } = yield (0, checkMail_1.default)(mail);
    if (valid === false) {
        yield exists.deleteOne();
        return res.status(400).json({
            message: `Email is not valid. Your Account has been deleted.`
        });
    }
    if (exists.mail.isVerified && exists.username) {
        return res.status(409).json({
            message: "Account has already been verified."
        });
    }
    exists.manageOTP.totp = totp;
    exists.manageOTP.totpDate = totpDate;
    yield exists.save();
    const transportMail = {
        senderName: "Always Appear",
        to: mail,
        subject: "Email Verification",
        text: `Code: ${totp}`
    };
    yield (0, mailer_1.default)(transportMail);
    res.status(200).json({
        success: true
    });
}));
//# sourceMappingURL=req-otp.js.map