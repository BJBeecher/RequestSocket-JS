import Client from "./client";

export = class Response {
    client: Client

    constructor(client: Client){
        this.client = client;
    }
}