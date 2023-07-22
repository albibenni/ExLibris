import {
  Book,
  Library,
  LibraryCreationRequest,
  LibraryUpdateRequest,
} from '../library.model';
import { dtoFromUser, UserDto } from '../../user/dto/user.dto';
import { User } from '../../user/user.model';

export class LibraryDto {
  id: string;
  address: string;
  managers: UserDto[];
  books: BookDto[];

  constructor(
    id: string,
    address: string,
    managers: UserDto[],
    books: BookDto[],
  ) {
    this.id = id;
    this.address = address;
    this.managers = managers;
    this.books = books;
  }
}

export class BookDto implements Book {
  title: string;
  topic: string;
}

export class LibraryCreationRequestDto implements LibraryCreationRequest {
  address: string;
  books: BookDto[];
  managers: User[];
}

export class LibraryUpdateRequestDto implements LibraryUpdateRequest {
  books: BookDto[];
  manager: User[];
}

export const dtoFromLibrary = (library: Library): LibraryDto => {
  return new LibraryDto(
    library._id != null ? library._id.toString() : null,
    library.address,
    library.managers.map((user) => dtoFromUser(user)),
    library.books,
  );
};
