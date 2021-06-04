import WebSocket from "ws";
import Request from "./request";

interface RequestInterface {
    id: string
    payload: string
}

export = <T>(data: WebSocket.Data): Request<T> => {
    switch (data) {
        case data as string:
            const json : RequestInterface = JSON.parse(data);
            const payload : T = JSON.parse(json.payload)
            const request = new Request(json.id, payload);
            return request;
        default:
            throw 'Bad request'
    }
};