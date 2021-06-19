
class SocketRequest<Payload, Context> {
    id: string
    payload: Payload
    context: Context

    constructor(id: string, payload: Payload, context: Context){
        this.id = id;
        this.payload = payload;
        this.context = context;
    }
}

export = SocketRequest;