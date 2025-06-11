/**
 * EmailVerificationRepository Interface
 * 이메일 인증 도메인 리포지토리 인터페이스
 */
import type { EmailVerification } from '../entity/email-verification.entity';
import type { Email } from '../vo/email.vo';

export interface EmailVerificationRepository {
  findById(id: string): Promise<EmailVerification | null>;
  findByEmail(email: Email): Promise<EmailVerification | null>;
  save(emailVerification: EmailVerification): Promise<EmailVerification>;
  update(emailVerification: EmailVerification): Promise<EmailVerification>;
  delete(id: string): Promise<void>;
}
