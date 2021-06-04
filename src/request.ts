export = class Request<T> {
    id: String
    payload: T

    constructor(id: String, payload: T){
        this.id = id;
        this.payload = payload;
    }
}