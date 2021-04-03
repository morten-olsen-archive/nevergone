import createServer from './server';
import Config from './Config';

const main = async () => {
  const config = new Config();
  const app = await createServer(config);
  app.listen(4000, '0.0.0.0', () => {
    console.log('Server is running on http://localhost:4000/graphql')
  });
};

main().catch(console.error);
