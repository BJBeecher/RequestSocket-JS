import WebSocket from "ws";

interface RequestInterface<Payload> {
    id: string
    payload: Payload
}

const parseText = <Payload>(text: string) : RequestInterface<Payload> => {
    const json : any = JSON.parse(text);
    if (!json.id) throw new Error('bad socket message - missing id');
    if (!json.payload) throw new Error('bad socket message - missing payload');
    const request = json as RequestInterface<Payload>;
    return request;
}

const parseBuffer = <Payload>(buffer: Buffer) : RequestInterface<Payload> => {
    const text : string = buffer.toString('utf8');
    const request : RequestInterface<Payload> = parseText(text);
    return request;
}

const isString = (data: WebSocket.Data): data is string => typeof data === 'string';
const isBuffer = (data: WebSocket.Data): data is Buffer => data instanceof Buffer;

const parseMessage = <Payload>(data: WebSocket.Data) : RequestInterface<Payload> | never => {
    if (isString(data)) {
        const text = data as string;
        return parseText(text);
    } else if (isBuffer(data)) {
        const buffer = data as Buffer;
        return parseBuffer(buffer);
    } else {
        throw new Error('bad socket message format');
    }
};

export default parseMessage;