export class GatewayException extends Error {
    constructor(private _name: string, private _code: number, private _raison?: string){
        super(`${_name} => ${_code}: ${_raison}`)
    }
}