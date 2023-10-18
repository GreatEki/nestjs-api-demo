import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/local')
  async signupLocal(@Body() dto: AuthDto) {
    await this.authService.signupLocal(dto);
  }

  @Post('/signin/local')
  signinLocal() {}

  @Post('/logout')
  logout() {}

  @Post('/refresh')
  refresh() {}
}
