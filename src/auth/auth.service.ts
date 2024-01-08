import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError, PrismaClientValidationError, detectRuntime } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _jwt: JwtService,
    private readonly _config: ConfigService
  ) { }

  async signUp(authDto: AuthDto) {
    try {
      // generate the password hash
      const { email, password, userName } = authDto;
      const hash = await argon.hash(password);
      // save the new user in db
      const user = await this._prisma.user.create({
        data: {
          email,
          hash,
          user_name: userName
        }
      })
      // return the saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException("Credentials taken")
        }
      };
      throw error;

    }
  }

  async signIn(authDto: AuthDto) {
    const { email, password } = authDto
    // find the user
    const existUser = await this._prisma.user.findUnique({
      where: {
        email
      }
    })

    // if user not exist throw exception
    if (!existUser) throw new ForbiddenException('Credentials incorrents')

    // compare passport
    const pswMatches = await argon.verify(existUser.hash, password)
    // if passport incorrect thow exception
    if (!pswMatches) throw new ForbiddenException('Credentials incorrents')
    const { id, email: emailVerified, user_name: userName } = existUser;
    // send back the user
    return this.signToken(id, emailVerified);

  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    }

    const secret = this._config.get('JWT_SECRET');

    const token = await this._jwt.signAsync(payload, {
      expiresIn: '15m',
      secret
    });

    return {
      access_token: token
    }

  }


} 