import 'module-alias/register';
import 'reflect-metadata';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as dotenv from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import { InversifyConfigContainer } from '@ioc/IocConfig';
import Middleware from '@shared-infra/http/middleware/index';
import { MongoDbConnection } from '@shared-infra/persistence/mongo/Database';
import { logger } from '@core/logger/Logger';
import errorMiddleware from '@shared-infra/http/middleware/ErrorMiddleware';
import ExitProcess from '@core/utils/ExitProcess';

dotenv.config();
const port = process.env.PORT;

const expressApp = (async (): Promise<void> => {
  /* Setting up IoC */
  const containerConfig = await InversifyConfigContainer();
  const server = new InversifyExpressServer(containerConfig, null, {
    rootPath: '/exitPro'
  });

  /* Adding middleware to express server */
  server.setConfig((app) => {
    new Middleware(app);
  });

  /* Mongo db connection to server */
  MongoDbConnection.initConnection()
    .then(async () => {
      MongoDbConnection.setAutoReconnect();
      const serverInstance = await server.build();
      serverInstance.listen(port, () => {
        logger.info(`Server running at http://localhost:${port}/`);
      });
    })
    .catch((error) => {
      logger.error(error);
    });

  server.setErrorConfig(errorMiddleware);

  ExitProcess(server);
})();

expressApp;
