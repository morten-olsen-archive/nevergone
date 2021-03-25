import createServer from './server';
import createMiddleware from '@morten-olsen/inventory-client/dist/tools/middleware';

const main = async () => {
  const middleware = await createMiddleware();
  const app = await createServer();
  app.use(middleware);
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql')
  });
};

main().catch(console.error);
