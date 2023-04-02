"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const timerArr = [61, 69, 78, 89, 99];
const limiter = (0, express_rate_limit_1.default)({
    windowMs: timerArr[Math.floor(Math.random() * timerArr.length)] * 1000,
    max: 5,
    message: {
        message: 'Too many attempts. Please, try again later.'
    },
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});
exports.default = limiter;
//# sourceMappingURL=limiter.js.map