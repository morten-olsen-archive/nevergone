import 'reflect-metadata';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import express, { Express } from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import setupDB from './data/setup';
import morgan from 'morgan';
import cors from 'cors';
import security from './security/middleware';
import fileUploadApi from './files';
import Config from './Config';

import ResourceResolver from './resolvers/Resource'
import ResourceTypeResolver from './resolvers/ResourceType';

const create = async (config: Config): Promise<Express> => {
  const db = await setupDB({
    connection: config.sqlitePath,
    client: 'sqlite',
    useNullAsDefault: true,
  });
  const container = Container;
  container.set('db', db);
  container.set('config', config);
  const schema = await buildSchema({
    resolvers: [ResourceResolver, ResourceTypeResolver],
    emitSchemaFile: true,
    container: ({ context }) => {
      return context.container;
    },
  })

  const app = express();
  app.use(morgan('dev'));
  app.use(cors());
  app.use('/', await security({
    domain: config.oidcUrl,
    clientId: config.oidcClientId,
  }));
  app.use('/files', fileUploadApi(db));

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = (req as any).token;
      if (!token) {
        throw new AuthenticationError('Token is invalid');
      }
      return {
        token,
        container,
      };
    },
  });

  server.applyMiddleware({ app })

  return app;
}

export default create;
