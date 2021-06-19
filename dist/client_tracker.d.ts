import Client from "./client";
declare class ClientTracker {
    private clients;
    private pingInterval;
    constructor();
    addClient(client: Client): void;
    stopPinger(): void;
}
declare const _default: ClientTracker;
export = _default;
//# sourceMappingURL=client_tracker.d.ts.map