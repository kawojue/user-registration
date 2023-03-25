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
exports.handleAllUsers = exports.handleUser = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const asyncHandler = require('express-async-handler');
exports.handleUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userSchema_1.default.findOne({ username: id }).select(('-password -refreshToken')).exec();
    if (!user) {
        return res.status(404).json({
            success: false
        });
    }
    res.status(200).json({
        success: true,
        user
    });
}));
exports.handleAllUsers = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield userSchema_1.default.find().select('-password');
    res.status(200).json({
        allUsers
    });
}));
//# sourceMappingURL=userController.js.map