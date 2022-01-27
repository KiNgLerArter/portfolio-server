import { User } from '@db-models/user.model';

export class AuthUserDto {
  readonly id: number;
  readonly email: string;
  readonly isBanned: boolean;
  readonly isActivated: boolean;

  constructor({ id, email, isActivated, isBanned }: User) {
    this.id = id;
    this.email = email;
    this.isBanned = isBanned;
    this.isActivated = isActivated;
  }
}
