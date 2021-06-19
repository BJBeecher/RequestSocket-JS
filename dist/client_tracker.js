"use strict";
class ClientTracker {
    constructor() {
        this.clients = [];
        this.pingInterval = setInterval(_ => {
            this.clients.forEach((client, index) => {
                if (client.isAlive) {
                    client.isAlive = false;
                    client.sendPing();
                }
                else {
                    client.closeConnection();
                    this.clients.splice(index, 1);
                }
            });
        }, 15 * 1000);
    }
    addClient(client) {
        this.clients.push(client);
    }
    stopPinger() {
        clearInterval(this.pingInterval);
    }
}
module.exports = new ClientTracker();
//# sourceMappingURL=client_tracker.js.map