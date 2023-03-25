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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const asyncHandler = require('express-async-handler');
exports.verify = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId, otp, totp, date } = req.body;
    otp = otp === null || otp === void 0 ? void 0 : otp.trim();
    userId = userId === null || userId === void 0 ? void 0 : userId.trim().toLowerCase();
    const expiry = date + 60 * 60 * 1000;
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
//# sourceMappingURL=verifyOTPController.js.map