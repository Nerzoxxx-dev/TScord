"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
}
exports.Utils = Utils;
