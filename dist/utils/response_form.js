"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form = {
    success: (message, data) => {
        return {
            success: true,
            message,
            data
        };
    },
    fail: (message, error) => {
        return {
            success: false,
            message,
            error
        };
    }
};
exports.default = form;
//# sourceMappingURL=response_form.js.map