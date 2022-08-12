import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UserPayloadInterface } from "@app/auth/interfaces/userPayload.interface";
import { UserValidateResponseInterface } from "@app/auth/interfaces/userValidateResponse.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY
    });
  }

  async validate(payload: UserPayloadInterface): Promise<UserValidateResponseInterface> {
    return { userId: payload.sub, username: payload.username };
  }
}
