import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import Principal, { TokenData } from './model/principal.model';

@Dependencies(UserService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user = await this.userService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  public async createPrincipal(principal: TokenData): Promise<Principal> {
    const user = await this.userService.findByEmail(principal.email);
    return {
      id: user._id.toString(),
      roles: principal.roles,
      email: user.email.toLowerCase(),
      firstName: user.firstName,
      familyName: user.familyName,
      refreshToken: principal.refreshToken,
    };
  }
}
