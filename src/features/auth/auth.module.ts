import { TokenModule } from '@features/token/token.module';
import { UsersModule } from '@features/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule), TokenModule],
  exports: [AuthService, TokenModule],
})
export class AuthModule {}
