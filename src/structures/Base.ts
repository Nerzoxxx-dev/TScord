import {Client} from '../Client';

export abstract class Base {

    public readonly client;

    constructor(client: Client){
        this.client = client;
    }

}