"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const deep_email_validator_1 = require("deep-email-validator");
const checkMail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let { valid, validators } = yield (0, deep_email_validator_1.validate)(email);
    return { valid, validators };
});
exports.default = checkMail;
//# sourceMappingURL=checkMail.js.map