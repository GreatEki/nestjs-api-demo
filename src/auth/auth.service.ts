import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { hashData } from 'util/hash.util';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signupLocal(dto: AuthDto) {
    const hashPassword = hashData(dto.password);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashPassword,
        hashedRefreshToken: 'refresh-token',
      },
    });
    console.log(dto);
  }

  signinLocal() {}

  logout() {}

  refresh() {}
}
