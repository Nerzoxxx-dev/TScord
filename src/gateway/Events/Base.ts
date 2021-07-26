import { Client } from "../../Client";

export abstract class Base {
    constructor(protected _client: Client){}
}