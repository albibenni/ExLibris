import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ROLES } from '../auth/roles';
import { Roles } from '../auth/guard/role-guard';
import { dtoFromUser, UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles(ROLES.ADMIN)
  async getUsers(): Promise<UserDto[]> {
    return this.userService.findUsers().then((users) => users.map(dtoFromUser));
  }

  @Get(':id')
  @Roles(ROLES.ADMIN)
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService
      .findById(id)
      .then((user) =>
        user
          .map(dtoFromUser)
          .orElseThrow(
            () => new NotFoundException(`user with id ${id} not found`),
          ),
      );
  }
}
