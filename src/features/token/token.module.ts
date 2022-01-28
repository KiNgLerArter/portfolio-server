import { Token } from '@db-models/token.model';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [
    SequelizeModule.forFeature([Token]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET',
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  exports: [TokenService],
})
export class TokenModule {}
