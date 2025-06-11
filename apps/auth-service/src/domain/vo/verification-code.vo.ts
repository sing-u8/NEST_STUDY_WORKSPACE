/**
 * VerificationCode Value Object
 * 인증 코드의 생성, 만료, 검증을 담당하는 값 객체
 */
export class VerificationCode {
  private readonly _code: string;
  private readonly _expiresAt: Date;
  private static readonly CODE_LENGTH = 6;
  private static readonly EXPIRE_MINUTES = 10;

  constructor(code?: string, expiresAt?: Date) {
    this._code = code ?? VerificationCode.generateCode();
    this._expiresAt = expiresAt ?? VerificationCode.generateExpiry();
  }

  /**
   * 인증 코드 값 반환
   */
  get value(): string {
    return this._code;
  }

  /**
   * 만료 시각 반환
   */
  get expiresAt(): Date {
    return this._expiresAt;
  }

  /**
   * 인증 코드 생성 (숫자 6자리)
   */
  private static generateCode(): string {
    return Array.from({ length: VerificationCode.CODE_LENGTH }, () => Math.floor(Math.random() * 10)).join('');
  }

  /**
   * 만료 시각 생성 (현재 시각 + 10분)
   */
  private static generateExpiry(): Date {
    const now = new Date();
    now.setMinutes(now.getMinutes() + VerificationCode.EXPIRE_MINUTES);
    return now;
  }

  /**
   * 만료 여부 확인
   */
  isExpired(now: Date = new Date()): boolean {
    return now > this._expiresAt;
  }

  /**
   * 코드 일치 여부 확인
   */
  equals(code: string): boolean {
    return this._code === code;
  }
}
