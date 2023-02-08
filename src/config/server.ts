import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PORT } from './constant';
import logger from './logger';
import routers, { ApiRouters } from '../api/routers';
import ServerError from '../api/util/errors';
import notFoundMiddleware from '../api/middlewares/404';

class Server {
  private app: express.Express;

  constructor() {
    this.app = express();
    this.setup();
  }

  setupApiRouters(apiRouters: ApiRouters) {
    this.app.use('/api', apiRouters.router);
    this.app.use(ServerError.middleware());
    this.app.use(notFoundMiddleware);
  }

  private setup() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cors());
  }

  launch() {
    this.app.listen(PORT, () => {
      console.log('  server is running  ');
      logger.info(`http://localhost:${PORT}`);
    });
  }
}

const server = new Server();

server.setupApiRouters(routers);

export default server;
