export class Collection<K, V> extends Map<K, V>{

    public limit:number = 0;
    // If limit is equals at 0, the Collection haven't limit number

    constructor(limit?: number, entries?: [K, V][]){

        super(entries);

    }

    public set(k:K, v:V) :any{

        if(this.has(k)) this.delete(k)

        super.set(k, v)

    }

    public fetch(k: K){
        if(!this.get(k)) return [];
        return this.get(k);
    }
}