import { AuthTokens } from '@common/types/auth.types';
import { AuthUserDto } from '@features/auth/dtos/auth-user.dto';

export namespace userDto {
  export interface Basic {
    readonly email: string;
    readonly password: string;
  }

  export interface Extended extends Basic {
    readonly nickname: string;
  }

  export type BE = AuthTokens & { user: AuthUserDto };
}
