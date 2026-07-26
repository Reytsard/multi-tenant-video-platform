import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      //  ExtractJwt.fromAuthHeaderAsBearerToken()
      jwtFromRequest: (req) => {
        console.log(req?.cookies);
        return req?.cookies?.token || null;
      },
      ignoreExpiration: false,
      secretOrKey: 'randomSecretifkherigfhreiurgh',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
