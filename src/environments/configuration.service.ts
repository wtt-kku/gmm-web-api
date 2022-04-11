import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const fs = require('fs');
const dotenv = require('dotenv');

if (process.env?.ENV === undefined || process.env?.ENV === null) {
  process.env['ENV'] = 'dev';
}
Logger.log(process.env.ENV, '/> Environment setup success !!');
const envConfig = dotenv.parse(
  fs.readFileSync(__dirname + `/../../src/environments/${process.env.ENV}.env`),
);
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

class ConfigService {
  static getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES),
    };
  }
}

const CONFIG = {
  database: process.env.DB_DATABASE,
  version: process.env.VERSION,
};

export { ConfigService, CONFIG };
