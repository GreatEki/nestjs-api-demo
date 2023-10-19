import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/local')
  async signupLocal(@Body() dto: AuthDto) {
    return await this.authService.signupLocal(dto);
  }

  @Post('/signin/local')
  async signinLocal(@Body() dto: AuthDto) {
    return await this.authService.signinLocal(dto);
  }

  @Post('/logout')
  logout() {}

  @Post('/refresh')
  refresh() {}
}
