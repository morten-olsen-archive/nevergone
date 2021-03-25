import createServer from './server';

const main = async () => {
  const app = await createServer();
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql')
  });
};

main().catch(console.error);
