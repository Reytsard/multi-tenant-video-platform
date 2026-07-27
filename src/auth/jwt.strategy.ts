import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        return req.cookies.token;
      },
      // (req) => {
      //   console.log(req.cookies);
      //   return req.cookies.token;
      // }
      ignoreExpiration: false,
      secretOrKey: 'randomSecretifkherigfhreiurgh',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
