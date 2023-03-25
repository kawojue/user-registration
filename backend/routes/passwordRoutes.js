"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const verifyOTPController_1 = require("../controllers/verifyOTPController");
const resetPswdController_1 = require("../controllers/resetPswdController");
const forgotPswdController_1 = require("../controllers/forgotPswdController");
const passwordRoute = express_1.default.Router();
passwordRoute.post('/reset', forgotPswdController_1.handleForgotPswd);
passwordRoute.post('/verify', limiter_1.default, verifyOTPController_1.verify);
passwordRoute.post('/forgotten', resetPswdController_1.handleResetPswd);
exports.default = passwordRoute;
//# sourceMappingURL=passwordRoutes.js.map