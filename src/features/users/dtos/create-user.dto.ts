import { AuthTokens } from '@common/types/auth.model';
import { AuthUserDto } from '@features/auth/dtos/auth-user.dto';

export namespace userDto {
  export interface FE {
    readonly email: string;
    readonly password: string;
    readonly nickname: string;
  }

  export type BE = AuthTokens & { user: AuthUserDto };
}
