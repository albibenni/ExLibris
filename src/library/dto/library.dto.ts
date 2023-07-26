import {
  Book,
  Library,
  LibraryBookRentalRequest,
  LibraryCreationRequest,
  LibraryUpdateRequest,
} from '../library.model';
import { dtoFromUser, UserDto } from '../../user/dto/user.dto';
import { User } from '../../user/user.model';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  rented: boolean;

  constructor(title: string, topic: string, rented: boolean) {
    this.title = title;
    this.topic = topic;
    this.rented = rented;
  }
}

export class LibraryCreationRequestDto implements LibraryCreationRequest {
  @IsNotEmpty()
  @IsString()
  address: string;
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookDto)
  books: BookDto[];
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  managers: User[];
}

export class LibraryUpdateRequestDto implements LibraryUpdateRequest {
  books: BookDto[];
  manager: User[];
}

export class LibraryBookRentalRequestDto implements LibraryBookRentalRequest {
  books: BookDto[];
}

export const dtoFromBook = (book: Book): Book => {
  return new BookDto(book.title, book.topic, book.rented);
};

export const dtoFromLibrary = (library: Library): LibraryDto => {
  return new LibraryDto(
    library._id != null ? library._id.toString() : null,
    library.address,
    library.managers.map(dtoFromUser),
    library.books.map(dtoFromBook),
  );
};
