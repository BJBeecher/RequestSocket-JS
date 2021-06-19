"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const client_1 = __importDefault(require("./client"));
class WSServer {
    constructor(wss = new ws_1.Server({ noServer: true })) {
        this.upgradePromise = (req, socket, head) => new Promise((resolve, _reject) => {
            this.wss.handleUpgrade(req, socket, head, ws => {
                const client = new client_1.default(ws);
                resolve(client);
            });
        });
        this.wss = wss;
    }
}
WSServer.shared = new WSServer();
exports.default = WSServer;
//# sourceMappingURL=ws_server.js.map