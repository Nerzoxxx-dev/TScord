"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection extends Map {
    // If limit is equals at 0, the Collection haven't limit number
    constructor(limit, entries) {
        super(entries);
        this.limit = 0;
    }
    set(k, v) {
        if (this.has(k))
            this.delete(k);
        super.set(k, v);
    }
}
exports.Collection = Collection;
