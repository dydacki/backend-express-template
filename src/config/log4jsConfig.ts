import { configure } from 'log4js';

export const configureLogging = () =>
  configure({
    appenders: {
      file: {
        type: 'file',
        filename: 'logs/app.log',
      },
      console: {
        type: 'stdout',
      },
    },
    categories: {
      default: {
        appenders: ['file', 'console'],
        level: 'debug',
      },
    },
  });
