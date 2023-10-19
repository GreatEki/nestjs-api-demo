import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AcceessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AcceessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
