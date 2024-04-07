const path = require('path');
const ts = require('typescript');
const CheapPlugin = require('./src/cheap/build/webpack/plugin/CheapPlugin');

module.exports = (env) => {

  let entry = '';
  let output = '';
  let libraryTarget = 'umd';
  let library = '';
  let libraryExport;
  let outputPath = path.resolve(__dirname, './dist');

  if (env.transformer) {
    entry = './src/cheap/transformer/index.ts';
    output = 'transformer.js';
    libraryTarget = 'commonjs2';
    library = undefined;
    outputPath = path.resolve(__dirname, './src/cheap/build');
  }
  else if (env.avplayer) {
    entry = './src/avplayer/AVPlayer.ts';
    output = `avplayer${env.legacy ? '-legacy' : ''}.js`;
    library = 'AVPlayer';
    libraryExport = 'default';

    if (env.legacy && env.release) {
      outputPath += '/legacy';
    }
  }
  else if (env.polyfill) {
    entry = './src/cheap/polyfill/index.ts';
    output = 'cheap-polyfill.js';
    library = 'CheapPolyfill';
    libraryTarget = 'var';
  }
  else if (env.format) {
    entry = './src/avformat/test.library.ts';
    output = 'format.js';
    library = 'Format';
  }
  else {
    return;
  }

  const config = {
    stats: {
      assets: false,
      builtAt: true,
      source: false,
      chunks: false,
      timings: false,
      errors: true,
      warnings: true,
      children: true
    },
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules|output/
    },
    resolve: {
      extensions: ['.js', '.ts', '.json'],
      modules: [
        'node_modules'
      ],
      alias: {
        avcodec: path.resolve(__dirname, 'src/avcodec/'),
        avformat: path.resolve(__dirname, 'src/avformat/'),
        avnetwork: path.resolve(__dirname, 'src/avnetwork/'),
        avplayer: path.resolve(__dirname, 'src/avplayer/'),
        avprotocol: path.resolve(__dirname, 'src/avprotocol/'),
        avrender: path.resolve(__dirname, 'src/avrender/'),
        audiostretchpitch: path.resolve(__dirname, 'src/audiostretchpitch/'),
        audioresample: path.resolve(__dirname, 'src/audioresample/'),
        avpipeline: path.resolve(__dirname, 'src/avpipeline/'),
        avtranscode: path.resolve(__dirname, 'src/avtranscode/'),
        avutil: path.resolve(__dirname, 'src/avutil/'),

        cheap: path.resolve(__dirname, 'src/cheap/'),
        common: path.resolve(__dirname, 'src/common/')
      }
    },
    externals: {
      typescript: 'typescript'
    },
    devtool: +env.release ? false : 'source-map',
    mode: +env.release ? 'production' : 'development',
    optimization: {
      sideEffects: true,
      usedExports: true,
      // minimize: true,
      // legacy release 下编译会报错，关掉这个优化
      concatenateModules: (env.legacy && env.release) ? false : undefined
    },
    entry: entry,
    output: {
      filename: output,
      path: outputPath,
      library,
      libraryExport,
      libraryTarget
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: /__test__|WorkletProcessor2?(Base)?.ts$/,
          use: [
            +env.release ? {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  ['@babel/preset-env', {
                    targets: env.legacy ? {
                      'browsers': [
                        'last 2 versions',
                        'ie >= 10'
                      ]
                    } : {
                      chrome: '69'
                    }
                  }]
                ]
              }
            } : null
          ]
        },
        {
          test: /WorkletProcessor2?(Base)?.ts$/,
          use: [
            +env.release ? {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  ['@babel/preset-env', {
                    targets: {
                      chrome: env.legacy ? '49' : '69'
                    }
                  }]
                ]
              }
            } : null
          ]
        },
        {
          test: /\.ts?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, './tsconfig.json')
              }
            }
          ]
        },
        {
          test: /\.(glsl|vert|frag)$/,
          use: [
            'raw-loader',
            {
              loader: 'glslify-loader',
              options: {
                resourcePath: '/src/avrender/image/webgl/glsl'
              }
            }
          ]
        },
        {
          test: /\.wgsl$/,
          use: [
            'raw-loader'
          ]
        }
      ],
    },
    plugins: []
  };

  if (!env.transformer) {
    const configFile = ts.readConfigFile(path.resolve(__dirname, './tsconfig.json'), ts.sys.readFile);
    config.plugins.push(
      new CheapPlugin({
        projectPath: __dirname,
        exclude: /__test__/,
        threadFiles: [
          {
            file: path.resolve(__dirname, 'src/avpipeline/DemuxPipeline.ts'),
            include: [
              configFile.config.cheap.defined.DEBUG ? path.resolve(__dirname, 'src/common/function/concatTypeArray.ts') : null,
              configFile.config.cheap.defined.DEBUG ? path.resolve(__dirname, 'src/common/io/StreamReader.ts') : null
            ]
          },
          {
            file: path.resolve(__dirname, 'src/avpipeline/IOPipeline.ts')
          }
        ]
      })
    );
  }
  return config;
};