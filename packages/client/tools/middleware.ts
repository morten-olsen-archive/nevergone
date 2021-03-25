import webpack from 'webpack';
import express, { Express } from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import createConfig from './createConfig';

const createMiddleware = async (): Promise<Express> => {
  const config = createConfig({
    dev: true,
  });

  const middleware = express();
  const bundler = webpack(config);
  const devMiddleware = webpackDevMiddleware(bundler as any, {
    publicPath: config.output?.publicPath?.toString(),
  });
  const hotMiddleware = webpackHotMiddleware(bundler as any, {
    log: false,
    path: `/__webpack_hmr`,
    heartbeat: 10 * 1000,
  });
  middleware.use(devMiddleware);
  middleware.use(hotMiddleware);
  return middleware;
};

export default createMiddleware;
