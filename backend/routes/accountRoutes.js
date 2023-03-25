"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordRoutes_1 = __importDefault(require("./passwordRoutes"));
const accountRoute = express_1.default.Router();
accountRoute.use('/password', passwordRoutes_1.default);
exports.default = accountRoute;
//# sourceMappingURL=accountRoutes.js.map