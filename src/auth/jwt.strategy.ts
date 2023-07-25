import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import Principal, { TokenData } from './model/principal.model';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService, // private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        jwtConstants.secret /*configService.get<string>('TOKEN_SECRET')*/,
    });
  }

  validate(payload: any): Promise<Principal> {
    return this.authService.createPrincipal(payload as TokenData);
  }
}
