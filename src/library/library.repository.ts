import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Optional } from 'typescript-optional';
import { ObjectId } from 'mongodb';
import {
  Library,
  LibraryBookRentalRequest,
  LibraryCreationRequest,
  LibraryDocument,
  LibraryUpdateRequest,
} from './library.model';

@Injectable()
export class LibraryRepository {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<LibraryDocument>,
  ) {}
  public async create(
    request: LibraryCreationRequest,
  ): Promise<LibraryDocument> {
    return await this.libraryModel.create({
      address: request.address.toLowerCase(),
      books: request.books,
      managers: request.managers,
    });
  }
  public async delete(id: string): Promise<Optional<LibraryDocument>> {
    if (!ObjectId.isValid(id)) {
      return Optional.empty();
    }
    return Optional.ofNullable(
      await this.libraryModel
        .findByIdAndDelete(id, { returnDocument: 'before' })
        .exec(),
    );
  }

  public async deleteAll() {
    await this.libraryModel.deleteMany({}).exec();
  }

  public async findById(id: string): Promise<Optional<LibraryDocument>> {
    return this.libraryModel
      .findById(id)
      .exec()
      .then((d) => Optional.ofNullable(d));
  }

  public async findByAddress(
    address: string,
  ): Promise<Optional<LibraryDocument>> {
    return this.libraryModel
      .findOne({ address: address.toLowerCase() })
      .exec()
      .then((d) => Optional.ofNullable(d));
  }

  public async findAll(): Promise<Library[]> {
    return this.libraryModel.find().sort({ address: 1 }).exec();
  }

  public async findAllBooks(id: string): Promise<Optional<Library>> {
    if (!ObjectId.isValid(id)) {
      return Optional.empty();
    }
    return this.libraryModel
      .findById(id)
      .exec()
      .then((d) => Optional.ofNullable(d));
  }

  public async updateLibrary(
    id: string,
    request: LibraryUpdateRequest,
  ): Promise<Optional<Library>> {
    if (!ObjectId.isValid(id)) {
      return Optional.empty();
    }
    return this.libraryModel
      .findByIdAndUpdate(
        id,
        {
          books: request.books,
          mangers: request.manager,
        },
        { new: true },
      )
      .exec()
      .then((d) => Optional.ofNullable(d));
  }

  public async rentBooksFromALibrary(
    id: string,
    request: LibraryBookRentalRequest,
  ): Promise<Optional<Library>> {
    if (!ObjectId.isValid(id)) {
      return Optional.empty();
    }
    return this.libraryModel
      .findByIdAndUpdate(
        id,
        {
          books: request.books,
        },
        { new: true },
      )
      .exec()
      .then((d) => Optional.ofNullable(d));
  }
}
