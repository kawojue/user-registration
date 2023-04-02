"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedUrl = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.allowedUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_URL : 'http://localhost:5173';
const corsOptions = {
    origin: exports.allowedUrl,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
};
exports.default = corsOptions;
//# sourceMappingURL=corsOptions.js.map