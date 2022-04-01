import { AuthTokens } from '@common/types/auth.model';
import { UsersService } from '@features/users/users.service';
import { User } from '@db-models/user.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthUserDto } from './dtos/auth-user.dto';
import { TokenService } from '@features/token/token.service';
import { userDto } from '@features/users/dtos/create-user.dto';
import { RolesList } from '@common/types/roles.model';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  async register(
    userDto: userDto.Extended,
    roles: RolesList[] = undefined,
  ): Promise<userDto.BE> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email is already existing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser(
      {
        ...userDto,
        password: hashPassword,
      },
      roles,
    );

    return this.generateAndSaveTokens(user);
  }

  async login(userDto: userDto.Basic): Promise<userDto.BE> {
    const user = await this.validateUser(userDto);

    return this.generateAndSaveTokens(user);
  }

  async logout(refreshToken: string): Promise<void> {
    return this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<userDto.BE> {
    if (!refreshToken) {
      throw new UnauthorizedException('User is not logged in');
    }

    const tokenData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!tokenData || !tokenFromDb) {
      throw new UnauthorizedException('User is not logged in');
    }

    const user = await this.usersService.getUserByEmail(tokenData.email);
    return this.generateAndSaveTokens(user);
  }

  async registerUsers(
    userDtos: (userDto.Extended & { roles: RolesList[] })[],
  ): Promise<void> {
    const users = JSON.parse(JSON.stringify(userDtos));

    for (let i = 0; i < users.length; i++) {
      const roles = users[i].roles;
      delete users[i].roles;
      await this.register(users[i], roles);
    }
  }

  private async validateUser(userDto: userDto.Basic): Promise<User> {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException('User with email does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    console.log('[isPasswordCorrect]:', isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }

  private async generateAndSaveTokens(user: User): Promise<userDto.BE> {
    const tokens = this.tokenService.generateTokens(user);
    const authUserDto = new AuthUserDto(user);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user: authUserDto };
  }
}
