"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parse_1 = __importDefault(require("./parse"));
module.exports = (event) => {
    const request = parse_1.default(event.data);
};
//# sourceMappingURL=message.js.map