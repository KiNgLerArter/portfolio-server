import { AuthTokens } from '@common/types/auth.types';
import { Token } from '@db-models/token.model';
import { User } from '@db-models/user.model';
import { Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTokenDto } from './dtos/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
  ) {}

  async saveToken(userId: number, refreshToken: string): Promise<Token> {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await this.tokenRepository.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string): Promise<void> {
    await this.tokenRepository.destroy({ where: { refreshToken } });
  }

  async findToken(refreshToken: string): Promise<Token> {
    return await this.tokenRepository.findOne({ where: { refreshToken } });
  }

  generateTokens(user: User): AuthTokens {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '30d',
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }

  validateRefreshToken(token: string): CreateTokenDto {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }
}
