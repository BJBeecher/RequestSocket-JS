import WebSocket from "ws"
import parseMessage from "./parse";
import SocketRequest from "./socket_request";
import SocketResponse from "./socket_response";

export = class Client {
    socket: WebSocket
    isAlive: Boolean

    constructor(socket: WebSocket){
        this.socket = socket;
        this.isAlive = true;
    }

    recieve = <Payload, Context>(context: Context, onRequest: (request: SocketRequest<Payload, Context>, response: SocketResponse) => void) => {
        this.socket.on('message', (data) => {
            try {
                const iReq = parseMessage<Payload>(data);
                const req = new SocketRequest(iReq.id, iReq.payload, context);
                const res = new SocketResponse(req.id, this);
                onRequest(req, res);
            } catch (err) {
                console.log(err);
            }
        });
    }

    closeConnection = () => {
        this.socket.terminate();
    }

    sendPing = () => {
        this.socket.ping();
    }

    json = (json: object) => {
        const string = JSON.stringify(json);
        this.socket.send(string);
    }

    listenForPong = () => {
        this.socket.on('pong', _ => this.isAlive = true);
    }

    logErrors = () => {
        this.socket.on('error', err => console.log(err));
    }
}