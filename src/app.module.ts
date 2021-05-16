import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as path from 'path';
import * as fs from 'fs';
import * as rfs from 'rotating-file-stream';


let MorganInterceptorVariable = MorganInterceptor('dev');

if (process.env.NODE_ENV === 'production') {
  const logDirectory = path.join(__dirname, 'log');
  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  // create a rotating write stream
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory,
  });
  // setup the logger and log only 4xx and 5xx errors
  MorganInterceptorVariable = MorganInterceptor('combined', {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: accessLogStream,
  });
}

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    MorganModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptorVariable,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes('auth/*', 'tasks');
      .forRoutes('*');
  }
}

