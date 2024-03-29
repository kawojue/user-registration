"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const verifyOTP_1 = require("../controllers/verifyOTP");
const resetPswd_1 = require("../controllers/resetPswd");
const forgotPswd_1 = require("../controllers/forgotPswd");
const passwordRoute = express_1.default.Router();
passwordRoute.post('/verify', limiter_1.default, verifyOTP_1.verify);
passwordRoute.post('/reset', limiter_1.default, forgotPswd_1.handleForgotPswd);
passwordRoute.post('/forgotten', limiter_1.default, resetPswd_1.handleResetPswd);
exports.default = passwordRoute;
//# sourceMappingURL=passwordRoutes.js.map