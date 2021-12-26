import { AuthTokens } from '@common/types/auth.model';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
import { UsersService } from '@features/users/users.service';
import { User } from '@models/users.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto): Promise<AuthTokens> {
    const user = await this.validateUser(userDto);
    return this.generateTokens(user);
  }

  async registration(userDto: CreateUserDto): Promise<AuthTokens> {
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

    return this.generateTokens(user);
  }

  private generateTokens(user: User): AuthTokens {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<User> {
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
}
