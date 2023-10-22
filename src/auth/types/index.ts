export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  sub: number;
  email: string;
};
