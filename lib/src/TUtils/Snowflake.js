"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
`${bigint}`;
function getDate(snowflake) {
    return Math.floor(parseInt(snowflake, 10) / 4194304) + 1420070400000;
}
exports.getDate = getDate;
