"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.roles))
            return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const re = req === null || req === void 0 ? void 0 : req.roles.map((role) => rolesArray.includes(role)).find((val) => val === true);
        if (!re)
            return res.sendStatus(401);
        next();
    };
};
exports.default = verifyRoles;
//# sourceMappingURL=verifyRoles.js.map