import { IncomingMessage } from "http";
import { Socket } from "net";
import { URL } from "url";
import SocketRequest from "./socket_request";
import SocketResponse from "./socket_response";
import WSServer from './ws_server';

type UpgradeHandler<T> = (req: IncomingMessage) => Promise<T>
type Reciever<Payload, Context> = (request: SocketRequest<Payload, Context>, response: SocketResponse) => void

interface HTTPServer {
    on: (event: string, listener: (...args: any[]) => void) => HTTPServer
}

interface Options<T> {
    server: HTTPServer
    path: string,
    handleUpgrade: UpgradeHandler<T>
}

class Endpoint<Context> {
    server: HTTPServer
    path: string
    handleUpgrade: UpgradeHandler<Context>
    wss: WSServer

    constructor({ server, path = "/", handleUpgrade } : Options<Context>, wss: WSServer = WSServer.shared){
        this.server = server;
        this.path = path;
        this.handleUpgrade = handleUpgrade;
        this.wss = wss;
    }

    recieve = <Payload>(reciever: Reciever<Payload, Context>) => {
        this.server.on('upgrade', async (req: IncomingMessage, socket: Socket, head: Buffer) => {
            try {
                const urlString : string = req.url as string;
                const hostString : string = req.headers.host as string;
                const url = new URL(urlString, `ws://${hostString}`);
                if (this.path !== url.pathname) return;
                const context = await this.handleUpgrade(req);
                const client = await this.wss.upgradePromise(req, socket, head);
                client.listenForPong();
                client.logErrors();
                client.recieve(context, reciever);
            } catch (error) {
                console.log(error);
            }
        });
    }
}

export = Endpoint;