"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedUrls = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.allowedUrls = ['http://localhost:5173'];
// const corsOptions: CorsOptions = {
//     credentials: true,
//     origin: allowedUrl,
//     optionsSuccessStatus: 200,
//     methods: ['GET', 'POST', 'DELETE', 'PATCH']
// }
const corsOptions = {
    origin: (origin, callback) => {
        if (exports.allowedUrls.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
exports.default = corsOptions;
//# sourceMappingURL=corsOptions.js.map