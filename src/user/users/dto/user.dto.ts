import { User, UserCreationRequest, UserUpdateRequest } from '../user.model';
import { IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../../../auth/roles';

export class UserDto {
  id: string;
  email: string;
  firstName: string;
  familyName: string;
  roles: string[];

  constructor(
    id: string,
    email: string,
    firstName: string,
    familyName: string,
    roles: string[],
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.familyName = familyName;
    this.roles = roles;
  }
}

export class UserCreationRequestDto implements UserCreationRequest {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  familyName: string;
  @IsNotEmpty()
  roles: ROLES[];
}

export class UserUpdateRequestDto implements UserUpdateRequest {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  familyName: string;
  @IsNotEmpty()
  roles: ROLES[];
}

export const dtoFromUser = (user: User): UserDto => {
  if (!user) {
    return null;
  }

  return new UserDto(
    user._id != null ? user._id.toString() : null,
    user.email,
    user.firstName,
    user.familyName,
    user.roles,
  );
};
