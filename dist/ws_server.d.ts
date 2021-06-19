/// <reference types="node" />
import { Socket } from 'net';
import { IncomingMessage } from 'http';
import Client from './client';
declare class WSServer {
    private wss;
    private constructor();
    static shared: WSServer;
    upgradePromise: (req: IncomingMessage, socket: Socket, head: Buffer) => Promise<Client>;
}
export default WSServer;
//# sourceMappingURL=ws_server.d.ts.map