import { AuthTokens } from '@common/types/auth.model';
import { UsersService } from '@features/users/users.service';
import { User } from '@db-models/user.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthUserDto } from './dtos/auth-user.dto';
import { TokenService } from '@features/token/token.service';
import { userDto } from '@features/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: userDto.FE): Promise<userDto.BE> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email is already existing',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateAndSaveTokens(user);
  }

  async login(userDto: userDto.FE): Promise<userDto.BE> {
    const user = await this.validateUser(userDto);

    return this.generateAndSaveTokens(user);
  }

  async logout(refreshToken: string): Promise<void> {
    const token = await this.tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<userDto.BE> {
    if (!refreshToken) {
      throw new HttpException('User is not logged in', HttpStatus.UNAUTHORIZED);
    }

    const tokenData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!tokenData || !tokenFromDb) {
      throw new HttpException('User is not logged in', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersService.getUserByEmail(tokenData.email);
    return this.generateAndSaveTokens(user);
  }

  private async validateUser(userDto: userDto.FE): Promise<User> {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect email',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException({ message: 'Incorrect password' });
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
