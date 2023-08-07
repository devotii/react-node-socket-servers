const config = require('../config');
const { Server } = require('socket.io');

let io = null;

const Socket = {
    getIO() {
        return io;
    },

    init(server) {
        io = new Server(server, {
            cors: {
                origin: config.site.url,
                credentials: true
            }
        });
    }
};

module.exports = Socket;