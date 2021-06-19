import Client from "./client";
declare class SocketResponse {
    requestId: string;
    client: Client;
    constructor(requestId: string, client: Client);
    json(json: object): void;
}
export = SocketResponse;
//# sourceMappingURL=socket_response.d.ts.map