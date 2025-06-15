import { Injectable } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import type { TokenService } from '@authService/domain/service/token.service';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: Record<string, unknown>, options?: { expiresIn?: string | number }): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  async verify(token: string): Promise<Record<string, unknown>> {
    return this.jwtService.verifyAsync(token);
  }
}
