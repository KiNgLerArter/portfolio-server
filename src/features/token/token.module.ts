import { Token } from '@db-models/token.model';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [SequelizeModule.forFeature([Token]), JwtModule],
  exports: [TokenService],
})
export class TokenModule {}
