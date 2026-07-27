import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => req.cookies.token,
      ignoreExpiration: false,
      secretOrKey: 'randomSecretifkherigfhreiurgh',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
