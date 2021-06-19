declare class SocketRequest<Payload, Context> {
    id: string;
    payload: Payload;
    context: Context;
    constructor(id: string, payload: Payload, context: Context);
}
export = SocketRequest;
//# sourceMappingURL=socket_request.d.ts.map