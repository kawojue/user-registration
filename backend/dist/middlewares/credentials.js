"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions_1 = require("../config/corsOptions");
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (corsOptions_1.allowedUrl === origin) {
        res.header('Access-Control-Allow-Credentials', origin);
    }
    next();
};
exports.default = credentials;
//# sourceMappingURL=credentials.js.map