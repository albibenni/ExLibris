import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LibraryRepository } from './library.repository';
import {
  Book,
  Library,
  LibraryCreationRequest,
  LibraryUpdateRequest,
} from './library.model';
import { Optional } from 'typescript-optional';

@Injectable()
export class LibraryService {
  private readonly logger = new Logger(LibraryService.name);

  constructor(private readonly repo: LibraryRepository) {}

  findByAddress(address: string): Promise<Optional<Library>> {
    return this.repo.findByAddress(address);
  }

  findLibraries(): Promise<Library[]> {
    return this.repo.findAll();
  }

  create(
    requestBody: LibraryCreationRequest,
    request: Request,
  ): Promise<Library> {
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

  async updateLibrary(
    id: string,
    requestBody: LibraryUpdateRequest,
    request: Request,
  ): Promise<Optional<Library>> {
    const library = (await this.repo.findById(id)).orElseThrow(
      () => new NotFoundException(`Library with id ${id} not found`),
    );
    this.logger.log(`Update library with address: ${library.address}`);
    return this.repo.updateLibrary(id, requestBody);
  }

  async rendABook(
    id: string,
    requestBody: LibraryUpdateRequest,
    request: Request,
  ): Promise<Optional<Library>> {
    const library = (await this.repo.findById(id)).orElseThrow(
      () => new NotFoundException(`Library with id ${id} not found`),
    );
    this.logger.log(`Update library with address: ${library.address}`);
    return this.repo.updateLibrary(id, requestBody);
  }
}
