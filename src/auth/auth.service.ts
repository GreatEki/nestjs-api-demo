import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { compareHashData, hashData } from 'util/hash.util';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(dto: AuthDto) {
    const hashPassword = await hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashPassword,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    await this.updateUserRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signinLocal(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatch = compareHashData(dto.password, user.password);
    if (!passwordMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateUserRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  logout() {}

  refresh() {}

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        { secret: process.env.JWT_ACCESS_SECRET_KEY, expiresIn: 60 * 15 },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET_KEY,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateUserRefreshToken(userId: number, refreshToken: string) {
    const hash = await hashData(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken: hash },
    });
  }
}
