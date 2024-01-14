import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { LoggerModule } from "src/logger/logger.module";
import { LoggerService } from "src/logger/logger.service";

@Module({
  imports: [JwtModule.register({

  }), LoggerModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LoggerService]
})

export class AuthModule { }