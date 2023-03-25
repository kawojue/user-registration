"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = require("../../middlewares/verifyJWT");
const userController_1 = require("../../controllers/userController");
const router = express_1.default.Router();
router.get('/api/all', userController_1.handleAllUsers);
router.get('/:id', verifyJWT_1.verifyJWT, userController_1.handleUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map