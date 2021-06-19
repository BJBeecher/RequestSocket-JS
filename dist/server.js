"use strict";
const ws_1 = require("ws");
const options = {
    noServer: true,
    clientTracking: true
};
const server = new ws_1.Server(options);
module.exports = server;
//# sourceMappingURL=server.js.map