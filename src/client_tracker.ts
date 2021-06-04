import Client from "./client";

class ClientTracker {
    private clients : Client[]
    private pingInterval : NodeJS.Timeout

    constructor(){
        this.clients = [];
        this.pingInterval = setInterval( _ => {
            this.clients.forEach((client, index) => {
                if (client.isAlive) {
                    client.isAlive = false;
                    client.sendPing();
                } else {
                    client.closeConnection();
                    this.clients.splice(index, 1);
                }
            });
        }, 15 * 1000);
    }

    addClient(client: Client){
        this.clients.push(client);
    }

    stopPinger(){
        clearInterval(this.pingInterval);
    }
}

export = new ClientTracker();