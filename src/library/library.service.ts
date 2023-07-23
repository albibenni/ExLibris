import { Injectable, NotFoundException } from '@nestjs/common';
import { LibraryRepository } from './library.repository';
import { Book, Library, LibraryCreationRequest } from './library.model';

@Injectable()
export class LibraryService {
  constructor(private readonly repo: LibraryRepository) {}
  findByAddress(address: string) {
    return this.repo.findByAddress(address);
  }

  findLibraries(): Promise<Library[]> {
    return this.repo.findAll();
  }

  create(requestBody: LibraryCreationRequest, request: Request) {
    // const principal = <Principal>request.user;
    // principal.roles.include(ROLES.MANAGER)
    return this.repo.create(requestBody);
  }

  async getBooks(id: string): Promise<Book[]> {
    const library = await this.repo
      .findAllBooks(id)
      .then((lib) =>
        lib.orElseThrow(() => new NotFoundException('Library not found')),
      );
    return library.books;
  }
}
