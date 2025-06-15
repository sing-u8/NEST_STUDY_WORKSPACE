import type { EmailVerificationRepository } from '@authService/domain/repository/email-verification.repository';
import type { EmailVerification } from '@authService/domain/entity/email-verification.entity';
import type { Email } from '@authService/domain/vo/email.vo';

export class InMemoryEmailVerificationRepository implements EmailVerificationRepository {
  private verifications: EmailVerification[] = [];

  async findById(id: string): Promise<EmailVerification | null> {
    return this.verifications.find(v => v.id === id) ?? null;
  }

  async findByEmail(email: Email): Promise<EmailVerification | null> {
    return this.verifications.find(v => v.email.value === email.value) ?? null;
  }

  async save(verification: EmailVerification): Promise<EmailVerification> {
    const idx = this.verifications.findIndex(v => v.id === verification.id);
    if (idx >= 0) {
      this.verifications[idx] = verification;
    } else {
      this.verifications.push(verification);
    }
    return verification;
  }

  async update(verification: EmailVerification): Promise<EmailVerification> {
    return this.save(verification);
  }

  async delete(id: string): Promise<void> {
    this.verifications = this.verifications.filter(v => v.id !== id);
  }
}
