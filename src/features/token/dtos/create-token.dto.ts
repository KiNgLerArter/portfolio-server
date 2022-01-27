import { Role } from '@db-models/role.model';

export class CreateTokenDto {
  readonly id: number;
  readonly email: string;
  readonly roles: Role[];
}
