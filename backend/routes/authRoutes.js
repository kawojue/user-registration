"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const loginController_1 = require("../controllers/loginController");
const logoutController_1 = require("../controllers/logoutController");
const signupController_1 = require("../controllers/signupController");
const refreshTokenController_1 = require("../controllers/refreshTokenController");
const authRoute = express_1.default.Router();
authRoute.get('/logout', logoutController_1.handleLogout);
authRoute.post('/signup', signupController_1.handleSignup);
authRoute.get('/refresh', refreshTokenController_1.handleRefreshToken);
authRoute.post('/login', limiter_1.default, loginController_1.handleLogin);
exports.default = authRoute;
//# sourceMappingURL=authRoutes.js.map