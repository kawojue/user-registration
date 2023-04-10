"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const autoIncrement = require('mongoose-sequence')(mongoose);
const userShema = new mongoose.Schema({
    mail: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 9823
        },
        Admin: Number,
        Employee: Number,
    },
    refreshToken: String,
    deviceInfo: {
        name: String,
        version: String,
        os: String
    },
    manageOTP: {
        totp: String,
        totpDate: Number
    },
    lastLogout: {
        type: String
    }
}, {
    collection: 'usersDB',
    timestamps: true
});
userShema.plugin(autoIncrement, {
    inc_field: 'user',
    id: 'userNums',
    start_req: 1
});
exports.default = mongoose.model('userModel', userShema);
//# sourceMappingURL=userSchema.js.map