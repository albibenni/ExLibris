import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { UserCreationRequest } from './user.model';
import { ROLES } from '../../auth/roles';

export const USERS: UserCreationRequest[] = [
  {
    firstName: 'Mike',
    familyName: 'Librarian',
    email: 'mike.librarian@exlibris.com',
    roles: [ROLES.MANAGER, ROLES.ADMIN],
  },
  {
    firstName: 'Ella',
    familyName: 'AvidReader',
    email: 'ella.avid-reader@google.com',
    roles: [ROLES.AFFILIATE_USER, ROLES.SIMPLE_USER],
  },
  {
    firstName: 'Asia',
    familyName: 'ReaderToBe',
    email: 'asia.reader-to-be@google.com',
    roles: [ROLES.SIMPLE_USER],
  },
];

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly repo: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get('NODE_ENV') === 'development') {
      await this.repo.deleteAll();
      for (const u of USERS) {
        await this.repo.create({
          ...u,
        });
      }
    }
  }

  findUsers(request): {};

  findById(request, id: string) {}
}
