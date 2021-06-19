"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const url_1 = require("url");
const ws_server_1 = __importDefault(require("./ws_server"));
class Endpoint {
    constructor({ server, path = "/", handleUpgrade }, wss = ws_server_1.default.shared) {
        this.recieve = (reciever) => {
            this.server.on('upgrade', (req, socket, head) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const urlString = req.url;
                    const hostString = req.headers.host;
                    const url = new url_1.URL(urlString, `ws://${hostString}`);
                    if (this.path !== url.pathname)
                        return;
                    const context = yield this.handleUpgrade(req);
                    const client = yield this.wss.upgradePromise(req, socket, head);
                    client.listenForPong();
                    client.logErrors();
                    client.recieve(context, reciever);
                }
                catch (error) {
                    console.log(error);
                }
            }));
        };
        this.server = server;
        this.path = path;
        this.handleUpgrade = handleUpgrade;
        this.wss = wss;
    }
}
module.exports = Endpoint;
//# sourceMappingURL=endpoint.js.map