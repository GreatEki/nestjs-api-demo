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
import { Request } from 'express';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import {
  GetCurrentUserId,
  GetCurrentUser,
  Public,
} from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup/local')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto) {
    return await this.authService.signupLocal(dto);
  }

  @Public()
  @Post('/signin/local')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto) {
    return await this.authService.signinLocal(dto);
  }

  @Get('/logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    return await this.authService.logout(Number(req.user['sub']));
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
