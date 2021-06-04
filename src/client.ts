import WebSocket from "ws"

export = class Client {
    socket: WebSocket
    isAlive: Boolean

    constructor(socket: WebSocket){
        this.socket = socket;
        this.isAlive = true;
    }

    closeConnection(){
        this.socket.terminate();
    }

    sendPing(){
        this.socket.ping();
    }
}