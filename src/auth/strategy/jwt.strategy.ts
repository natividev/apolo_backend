import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly _config: ConfigService,
    private readonly _prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _config.get('JWT_SECRET')
    })
  }

  async validate(payload: any) {

    //const user sub
    const user = await this._prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    })

    console.log(user)

    delete user.hash;

    return user;
  }
}