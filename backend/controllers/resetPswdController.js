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
exports.handleResetPswd = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const asyncHandler = require('express-async-handler');
exports.handleResetPswd = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, verified, pswd, deviceInfo } = req.body;
    if (!userId || !pswd || !verified) {
        return res.status(400).json({
            success: false,
            message: 'Access denied.'
        });
    }
    const getUser = yield userSchema_1.default.findOne({ 'mail.email': userId }).exec();
    if (!getUser) {
        return res.status(404).json({
            success: false,
            message: 'User not found.'
        });
    }
    const oldPswd = getUser.password;
    const isMatch = yield bcrypt_1.default.compare(pswd, oldPswd);
    if (isMatch) {
        return res.status(400).json({
            success: false,
            message: "You input your current password."
        });
    }
    const hashedPswd = yield bcrypt_1.default.hash(pswd, 12);
    getUser.password = hashedPswd;
    getUser.deviceInfo = deviceInfo;
    yield getUser.save();
    res.json({
        success: true,
        message: "Password successfully changed."
    });
}));
//# sourceMappingURL=resetPswdController.js.map