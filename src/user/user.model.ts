import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { ROLES } from '../auth/roles';

export type UserDocument = User & Document;
export type UserRef = User | MongooseSchema.Types.ObjectId;

export interface UserCreationRequest {
  firstName: string;
  familyName: string;
  email: string;
  roles: ROLES[];
}

export interface UserUpdateRequest {
  firstName: string;
  familyName: string;
  roles: ROLES[];
}

@Schema({ autoIndex: true })
export class User {
  _id: ObjectId;

  @Prop({ index: true, required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], index: true })
  roles: string[];

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  familyName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
