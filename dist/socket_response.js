"use strict";
class SocketResponse {
    constructor(requestId, client) {
        this.requestId = requestId;
        this.client = client;
    }
    json(json) {
        const message = {
            requestId: this.requestId,
            payload: json
        };
        this.client.json(message);
    }
}
module.exports = SocketResponse;
//# sourceMappingURL=socket_response.js.map