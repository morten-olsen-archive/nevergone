import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import setupDB from './data/setup';
import morgan from 'morgan';
import cors from 'cors';
import fileUploadApi from './files';

import ResourceResolver from './resolvers/Resource'
import ResourceTypeResolver from './resolvers/ResourceType';

const create = async (): Promise<Express> => {
  const db = await setupDB({
    connection: './data',
    client: 'sqlite',
    useNullAsDefault: true,
  });
  const container = Container;
  container.set('db', db);
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
  app.use('/files', fileUploadApi(db));

  const server = new ApolloServer({
    schema,
    context: () => {
      return {
        container,
      };
    },
  });

  server.applyMiddleware({ app })

  return app;
}

export default create;
