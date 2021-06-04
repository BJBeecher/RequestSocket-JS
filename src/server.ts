import { Server, ServerOptions } from 'ws';
import parse from './parse';

const options : ServerOptions = {
    noServer: true,
    clientTracking: true
};

const server = new Server(options);

export = server;