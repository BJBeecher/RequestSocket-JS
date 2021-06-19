import WebSocket from "ws";
import SocketRequest from "./socket_request";
import SocketResponse from "./socket_response";
declare const _default: {
    new (socket: WebSocket): {
        socket: WebSocket;
        isAlive: Boolean;
        recieve: <Payload, Context>(context: Context, onRequest: (request: SocketRequest<Payload, Context>, response: SocketResponse) => void) => void;
        closeConnection: () => void;
        sendPing: () => void;
        json: (json: object) => void;
        listenForPong: () => void;
        logErrors: () => void;
    };
};
export = _default;
//# sourceMappingURL=client.d.ts.map