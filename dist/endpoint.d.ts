/// <reference types="node" />
import { IncomingMessage } from "http";
import SocketRequest from "./socket_request";
import SocketResponse from "./socket_response";
import WSServer from './ws_server';
declare type UpgradeHandler<T> = (req: IncomingMessage) => Promise<T>;
declare type Reciever<Payload, Context> = (request: SocketRequest<Payload, Context>, response: SocketResponse) => void;
interface HTTPServer {
    on: (event: string, listener: (...args: any[]) => void) => HTTPServer;
}
interface Options<T> {
    server: HTTPServer;
    path: string;
    handleUpgrade: UpgradeHandler<T>;
}
declare class Endpoint<Context> {
    server: HTTPServer;
    path: string;
    handleUpgrade: UpgradeHandler<Context>;
    wss: WSServer;
    constructor({ server, path, handleUpgrade }: Options<Context>, wss?: WSServer);
    recieve: <Payload>(reciever: Reciever<Payload, Context>) => void;
}
export = Endpoint;
//# sourceMappingURL=endpoint.d.ts.map