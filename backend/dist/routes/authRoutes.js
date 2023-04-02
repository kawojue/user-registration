"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const login_1 = require("../controllers/login");
const logout_1 = require("../controllers/logout");
const signup_1 = require("../controllers/signup");
const refreshToken_1 = require("../controllers/refreshToken");
const authRoute = express_1.default.Router();
authRoute.get('/logout', logout_1.handleLogout);
authRoute.post('/signup', signup_1.handleSignup);
authRoute.get('/refresh', refreshToken_1.handleRefreshToken);
authRoute.post('/login', limiter_1.default, login_1.handleLogin);
exports.default = authRoute;
//# sourceMappingURL=authRoutes.js.map