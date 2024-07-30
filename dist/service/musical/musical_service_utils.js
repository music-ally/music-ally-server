"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate_age = void 0;
function calculate_age(birthday) {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const age_group = Math.floor(age / 10) * 10;
    return age_group;
}
exports.calculate_age = calculate_age;
//# sourceMappingURL=musical_service_utils.js.map