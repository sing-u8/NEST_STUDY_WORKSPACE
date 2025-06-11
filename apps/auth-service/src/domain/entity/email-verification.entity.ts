import type { Email } from '../vo/email.vo';
import { VerificationCode } from '../vo/verification-code.vo';

/**
 * EmailVerification Entity
 * 이메일 인증 요청 및 검증을 담당하는 도메인 엔티티
 */
export class EmailVerification {
  constructor(
    public readonly id: string,
    public readonly email: Email,
    public code: VerificationCode,
    public isVerified: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  /**
   * 인증 코드 검증 및 인증 처리
   */
  verify(inputCode: string): boolean {
    if (this.isVerified) return true;
    if (this.code.isExpired()) throw new Error('인증 코드가 만료되었습니다.');
    if (!this.code.equals(inputCode)) return false;
    this.isVerified = true;
    return true;
  }

  /**
   * 인증 코드 재발급
   */
  regenerateCode() {
    this.code = new VerificationCode();
    this.updatedAt = new Date();
    this.isVerified = false;
  }
}
