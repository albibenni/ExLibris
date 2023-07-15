import { Controller, Get, NotFoundException, Param, Req } from '@nestjs/common';
import { ROLES } from '../../auth/roles';
import { Roles } from '../../auth/guard/role-guard';
import { dtoFromUser, UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles(ROLES.ADMIN)
  async getTechnicians(@Req() request): Promise<UserDto[]> {
    return this.userService
      .findUsers(request)
      .then((users) => users.map(dtoFromUser));
  }

  @Get(':id')
  @Roles(ROLES.ADMIN)
  async getUser(@Req() request, @Param('id') id: string): Promise<UserDto> {
    return this.userService
      .findById(request, id)
      .then((u) =>
        u
          .map(dtoFromUser)
          .orElseThrow(
            () => new NotFoundException(`user with id ${id} not found`),
          ),
      );
  }
}
