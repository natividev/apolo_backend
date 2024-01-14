import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { LoggerService } from "src/logger/logger.service";


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly _logger: LoggerService
  ) { }

  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() authDto: AuthDto) {
    this._logger.log('Creating a new user', 'AuthController');
    return this.authService.signIn(authDto);
  }


}