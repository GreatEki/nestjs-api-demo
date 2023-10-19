import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/local')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto) {
    return await this.authService.signupLocal(dto);
  }

  @Post('/signin/local')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto) {
    return await this.authService.signinLocal(dto);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    return await this.authService.logout(Number(req.user['sub']));
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshToken(
      Number(user['sub']),
      user['refreshToken'],
    );
  }
}
