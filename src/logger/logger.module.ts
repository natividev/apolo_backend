import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    LoggerModule
  ],
  providers: [LoggerService],
  controllers: [LoggerController]
})
export class LoggerModule { }
