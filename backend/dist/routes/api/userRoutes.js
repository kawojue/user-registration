"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = require("../../middlewares/verifyJWT");
const user_1 = require("../../controllers/user");
const router = express_1.default.Router();
router.get('/api/all', user_1.handleAllUsers);
router.get('/:id', verifyJWT_1.verifyJWT, user_1.handleUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map