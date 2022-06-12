import { AuthTokens } from '@common/types/auth.types';
import { userDto } from '@features/users/dtos/create-user.dto';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: userDto.Extended,
  ) {
    const userData = await this.authService.register(userDto);
    this.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: userDto.Basic,
  ) {
    const userData = await this.authService.login(userDto);
    this.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return;
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const userData = await this.authService.refresh(refreshToken);
    this.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
}
