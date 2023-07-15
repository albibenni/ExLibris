import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserCreationRequest, UserDocument } from './user.model';
import { Optional } from 'typescript-optional';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public findAll(): Promise<User[]> {
    return this.userModel.find().sort({ email: 1 }).exec();
  }

  public findOne(id: string): Promise<Optional<UserDocument>> {
    return this.userModel
      .findById(id)
      .exec()
      .then((d) => Optional.ofNullable(d));
  }

  public findUserByEmail(email: string): Promise<Optional<UserDocument>> {
    return this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec()
      .then((d) => Optional.ofNullable(d));
  }

  public async create(request: UserCreationRequest): Promise<UserDocument> {
    return await this.userModel.create({
      firstName: request.firstName,
      familyName: request.familyName,
      email: request.email.toLowerCase(),
      roles: request.roles,
    });
  }
  public async delete(id: string): Promise<Optional<UserDocument>> {
    if (!ObjectId.isValid(id)) {
      return Optional.empty();
    }
    return Optional.ofNullable(
      await this.userModel
        .findByIdAndDelete(id, { returnDocument: 'before' })
        .exec(),
    );
  }

  public async deleteAll() {
    await this.userModel.deleteMany({}).exec();
  }
}
