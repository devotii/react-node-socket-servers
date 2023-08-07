const config = require('./config');
const log = require('./lib/log');

const { createServer } = require('http');
const express = require('express');
const app = express();
const server = createServer(app);

require('./services/io').init(server);
const io = require('./services/io').getIO();

const activeChildrens = new Set();

io.on('connect', socket => {
    socket.on('parent:init', data => {
        if (data.secret_code !== config.server.secret_code) {
            socket.emit('parent:init', { type: 'error', msg: `Incorrect secret code` });    
            return log(`Socket`, `${data.username || 'Someone'} tried to connect but secret code is incorrect`);
        };

        log(`Socket`, `${data.name} connected`);

        socket.emit('parent:init', true);
        socket.children = true;
        socket.name = data.name;
        activeChildrens.add(socket);
    });

    socket.on('disconnect', () => {
        if ('children' in socket) {
            log(`Socket`, `${socket.name} disconnected`);
            activeChildrens.delete(socket);
        };
    });

    socket.on('client:servers', () => {
        return socket.emit('client:servers', [...activeChildrens].map(child => { return child.name }));
    });

    socket.on('client:request', () => {
        const childrens = [...activeChildrens];
        if (!childrens.length) return socket.emit('client:request', { name: 'Server', msg: `We could not reach any child server.` });

        const index = Math.floor(Math.random() * childrens.length);
        const children = childrens[index];

        children.emit('client:request', { id: socket.id });

        children.once('client:request_response', data => {
            const { id, msg } = data;
            const client = io.sockets.sockets.get(id);

            client.emit('client:request', { stamp: +new Date()+Math.random() * 1000, name: children.name, msg });
        });
    });
});

server.listen(config.server.port, () => {
    log('Server', `Booted up - ${config.server.port}`);
});