import createServer from './server';
import Config from './Config';

const main = async () => {
  const config = new Config();
  const app = await createServer(config);
  app.listen(config.port, () => {
    console.log('Server is running');
  });
};

main().catch(console.error);
