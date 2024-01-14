import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {

  constructor(
    private readonly _logger: LoggerService
  ) { }

  @Get('info')
  gerInfoLog() {
    this._logger.log(
      'This is an INFO log message from the LoggerController.',
      'LoggerController',
    )
    return 'Logged an INFO message.';
  }

  @Get('error')
  getErrorLog() {
    this._logger.error(
      'This is an ERROR log message from the LoggerController.',
      null,
      'LoggerController',
    )
    return 'Logged an ERROR message.';

  }


}
