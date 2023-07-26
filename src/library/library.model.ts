import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.model';

export type LibraryDocument = Library & Document;
export type LibraryRef = Library | MongooseSchema.Types.ObjectId;

export interface LibraryCreationRequest {
  address: string;
  managers: User[];
  books: Book[];
}

export interface LibraryUpdateRequest {
  manager: User[];
  books: Book[];
}

export interface LibraryBookRentalRequest {
  books: Book[];
}

export interface Book {
  title: string;
  topic: string;
  rented: boolean;
}

@Schema({ autoIndex: true })
export class Library {
  _id: ObjectId;

  @Prop({ index: true, required: true, unique: true })
  address: string;

  @Prop({ type: [User], index: true })
  managers: User[];

  @Prop({ required: true })
  books: Book[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
