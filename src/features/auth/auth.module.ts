import { TokenModule } from '@features/token/token.module';
import { UsersModule } from '@features/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'SECRET',
      signOptions: {
        expiresIn: '30m',
      },
    }),
    TokenModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
