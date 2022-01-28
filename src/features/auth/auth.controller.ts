import { AuthTokens } from '@common/types/auth.model';
import { userDto } from '@features/users/dto/create-user.dto';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: userDto.FE,
  ) {
    const userData = await this.authService.registration(userDto);
    this.setRefreshTokenCookie(res, userData.refreshToken);
    return userData;
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: userDto.FE,
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
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.refresh(req.cookies.refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
}
