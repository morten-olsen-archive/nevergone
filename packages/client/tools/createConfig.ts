import path from 'path';
import { HotModuleReplacementPlugin, Configuration } from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

interface Options {
  dev: boolean;
}

const createConfig = ({
  dev,
}: Options) => {
  const babelConfig = {
    sourceType: 'unambiguous',
    presets: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-transform-runtime'),
      require.resolve('babel-plugin-react-native-web'),
    ],
  };

  if (dev) {
    babelConfig.plugins = [
      require.resolve('react-refresh/babel'),
      ...babelConfig.plugins,
    ];
  };

  let entries = [path.join(__dirname, '../../src/index')];
  if (dev) {
    entries = [require.resolve('webpack-hot-middleware/client'), ...entries];
  }

  const alias: {[name: string]: string} = {
    'react-native': 'react-native-web',
  };
  const plugins: any[] = [
    new HtmlWebpackPlugin(),
  ];

  if (dev) {
    plugins.push(
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: 'whm',
        },
      }),
    );
  }

  const config: Configuration = {
    context: __dirname,
    mode: dev ? 'development' : 'production',
    entry: entries,
    resolve: {
      extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.jsx', '.js'],
      modules: [
        path.join(__dirname, '..', 'src'),
        'node_modules',
      ],
      alias,
    },
    output: {
      path: path.join(__dirname, '../web'),
    },
    plugins,
    module: {
      rules: [{
        test: /\.(png|ttf)$/,
        use: require.resolve('file-loader'),
      }, {
        test: /\.(t|j)sx?$/,
        use: [{
          loader: require.resolve('react-hot-loader/webpack'),
        }, {
          loader: require.resolve('babel-loader'),
          options: babelConfig,
        }],
      }],
    },
  };

  return config;
};

export { Options };

export default createConfig;
