"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleCors(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'www.vercel.com');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
exports.default = handleCors;
//# sourceMappingURL=allowedCors.js.map