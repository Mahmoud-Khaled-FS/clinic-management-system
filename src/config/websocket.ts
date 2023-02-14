import { Server as Io } from 'socket.io';
import { Server } from 'http';
import { verify } from 'jsonwebtoken';
import { SECRET_TOKEN_KEY } from './constant';

class IoWebSocket {
  private _io: Io;
  private _users = new Map<string, string>();
  connect(server: Server) {
    this._io = new Io(server, {
      cors: {
        origin: '*',
      },
    });
    this._io.on('connection', (socket) => {
      try {
        const decodedToken = verify(socket.handshake.auth.token, SECRET_TOKEN_KEY) as { id: string };
        if (!decodedToken) {
          throw new Error();
        }
        this._users.set(decodedToken.id, socket.id);
        socket.on('disconnect', () => {
          this._users.delete(decodedToken.id);
        });
      } catch (err) {
        socket.emit('error', err.message);
        socket.disconnect();
      }
    });
  }
  get io() {
    return this._io;
  }
  getUser(id: string) {
    return this._users.get(id);
  }
}

export default new IoWebSocket();
