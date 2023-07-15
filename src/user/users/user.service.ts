import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { User, UserCreationRequest } from './user.model';
import { ROLES } from '../../auth/roles';
import { Optional } from 'typescript-optional';

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

  public findUsers(): Promise<User[]> {
    return this.repo.findAll();
  }

  public findById(id: string) {
    return this.repo.findOne(id);
  }

  public async findByEmail(email: string): Promise<User> {
    return (await this.repo.findUserByEmail(email)).orElseThrow(
      () => new NotFoundException(`user with email ${email} not found`),
    );
  }

  public async delete(id: string): Promise<Optional<User>> {
    (await this.findById(id)).orElseThrow(
      () => new NotFoundException(`user with id ${id} not found`),
    );
    return this.repo.delete(id);
  }
}
