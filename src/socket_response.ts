import Client from "./client";

class SocketResponse {
    requestId: string
    client: Client

    constructor(requestId: string, client: Client){
        this.requestId = requestId;
        this.client = client;
    }

    json(json: object){
        const message = { 
            requestId: this.requestId, 
            payload: json
        };

        this.client.json(message);
    }
}

export = SocketResponse;