"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
function generateOTP() {
    let OTP = '';
    const now = Date.now();
    const digits = '0123456789';
    const length = parseInt('65'[Math.floor(Math.random() * 2)]);
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * length)];
    }
    return { OTP, now };
}
exports.generateOTP = generateOTP;
//# sourceMappingURL=manageOTP.js.map