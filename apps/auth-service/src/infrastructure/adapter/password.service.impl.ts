import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { PasswordService } from '@authService/domain/service/password.service';

@Injectable()
export class BcryptPasswordService implements PasswordService {
  private readonly SALT_ROUNDS = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.SALT_ROUNDS);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
