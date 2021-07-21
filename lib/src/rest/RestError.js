"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.RestError = RestError;
