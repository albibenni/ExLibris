import { Injectable } from '@nestjs/common';
import { LibraryRepository } from './library.repository';

@Injectable()
export class LibraryService {
  constructor(private readonly repo: LibraryRepository) {}
  findByAddress(address: string) {
    return this.repo.findByAddress(address);
  }

  findLibraries() {
    return this.repo.findAll();
  }
}
