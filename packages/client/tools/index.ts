import webpack from 'webpack';
import createConfig, { Options } from './createConfig';

const create = async (options: Options) => {
  const config = createConfig(options);
  const bundler = webpack(config);
  const outputPath = config.output!.path!;

  return {
    bundler,
    outputPath,
  };
}

export default create;
