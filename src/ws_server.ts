import { Socket } from 'net';
import { IncomingMessage } from 'http';
import { Server as WSS } from 'ws';
import Client from './client';

class WSServer {
    private wss: WSS

    private constructor(wss: WSS = new WSS({ noServer: true })){
        this.wss = wss;
    }

    static shared = new WSServer();

    upgradePromise = (req: IncomingMessage, socket: Socket, head: Buffer) => new Promise<Client>((resolve, _reject) => {
        this.wss.handleUpgrade(req, socket, head, ws => {
            const client = new Client(ws);
            resolve(client);
        });
    })
}

export default WSServer;