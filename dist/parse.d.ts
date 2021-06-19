import WebSocket from "ws";
interface RequestInterface<Payload> {
    id: string;
    payload: Payload;
}
declare const parseMessage: <Payload>(data: WebSocket.Data) => RequestInterface<Payload>;
export default parseMessage;
//# sourceMappingURL=parse.d.ts.map