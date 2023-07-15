import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserCreationRequest, UserDocument } from './user.model';
import { Optional } from 'typescript-optional';

export class UsersRepository {
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
}
