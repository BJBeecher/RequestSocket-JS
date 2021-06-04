import { Socket } from 'net';
import { Server, IncomingMessage } from 'http';
import wss from './server';
import Request from './request';
import Response from './response';
import parse from './parse';
import { URL } from 'url';
import Client from './client';
import tracker from './client_tracker';

interface Options {
    server: Server
    path?: string
}

const entry = (options: Options, callBack: <T>(request: Request<T>, response: Response) => void) => {
    const { server, path } = options;

    server.on('upgrade', (req: IncomingMessage, socket: Socket, head: Buffer) => {
        const urlString : string = req.url as string;
        const hostString : string = req.headers.host as string;
        const url = new URL(urlString, `ws://${hostString}`);

        if (path == url.pathname) {
            wss.handleUpgrade(req, socket, head, ws => {
                const client = new Client(ws);

                tracker.addClient(client);

                ws.on('message', data => {
                    const request = parse(data);
                    const response = new Response(client);
                    callBack(request, response);
                });

                ws.on('error', err => console.log(err));
                ws.on('pong', _ => client.isAlive = true)
            });
        }
    });
}

export = entry;