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
exports.handleLogout = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const asyncHandler = require('express-async-handler');
const clearCookies = {
    httpOnly: true
};
exports.handleLogout = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.auth))
        return res.sendStatus(204);
    const refreshToken = cookies.auth;
    const existingUser = yield userSchema_1.default.findOne({ refreshToken }).exec();
    if (!existingUser) {
        res.clearCookie('auth', clearCookies);
        return res.sendStatus(204);
    }
    existingUser.refreshToken = "";
    existingUser.lastLogout = `${new Date()}`;
    yield existingUser.save();
    res.clearCookie('auth', clearCookies);
    res.sendStatus(204);
}));
//# sourceMappingURL=logout.js.map