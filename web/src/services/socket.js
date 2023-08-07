import config from '../config';
import { io } from 'socket.io-client';

export default io(config.server.url, {
    transports: ["websocket"],
    withCredentials: true,
    // secure: true,
    // rejectUnauthorized: false
});