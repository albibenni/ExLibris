import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Optional } from 'typescript-optional';
import { ObjectId } from 'mongodb';
import {
  Library,
  LibraryCreationRequest,
  LibraryDocument,
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
}
