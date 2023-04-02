"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const limiter_1 = __importDefault(require("../middlewares/limiter"));
const passwordRoutes_1 = __importDefault(require("./passwordRoutes"));
const accountSetup_1 = require("../controllers/accountSetup");
const accountRoute = express_1.default.Router();
accountRoute.use('/password', passwordRoutes_1.default);
accountRoute.post('/setup', limiter_1.default, accountSetup_1.handleAccountSetup);
exports.default = accountRoute;
//# sourceMappingURL=accountRoutes.js.map