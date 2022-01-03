import { AuthTokens } from '@common/types/auth.model';
import { CreateUserDto } from '@features/users/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto): Promise<AuthTokens> {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<AuthTokens> {
    return this.authService.registration(userDto);
  }
}
