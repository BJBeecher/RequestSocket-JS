"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parse_1 = __importDefault(require("./parse"));
const socket_request_1 = __importDefault(require("./socket_request"));
const socket_response_1 = __importDefault(require("./socket_response"));
module.exports = class Client {
    constructor(socket) {
        this.recieve = (context, onRequest) => {
            this.socket.on('message', (data) => {
                try {
                    const iReq = parse_1.default(data);
                    const req = new socket_request_1.default(iReq.id, iReq.payload, context);
                    const res = new socket_response_1.default(req.id, this);
                    onRequest(req, res);
                }
                catch (err) {
                    console.log(err);
                }
            });
        };
        this.closeConnection = () => {
            this.socket.terminate();
        };
        this.sendPing = () => {
            this.socket.ping();
        };
        this.json = (json) => {
            const string = JSON.stringify(json);
            this.socket.send(string);
        };
        this.listenForPong = () => {
            this.socket.on('pong', _ => this.isAlive = true);
        };
        this.logErrors = () => {
            this.socket.on('error', err => console.log(err));
        };
        this.socket = socket;
        this.isAlive = true;
    }
};
//# sourceMappingURL=client.js.map