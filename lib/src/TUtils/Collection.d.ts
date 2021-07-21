export declare class Collection<K, V> extends Map<K, V> {
    limit: number;
    constructor(limit?: number, entries?: [K, V][]);
    set(k: K, v: V): any;
}
