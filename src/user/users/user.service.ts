import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly repo: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get('NODE_ENV') === 'development') {
    }
  }
  findUsers(request): {};

  findById(request, id: string) {}
}
