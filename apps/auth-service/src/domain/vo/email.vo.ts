/**
 * Email Value Object
 * 이메일 주소의 유효성을 보장하고 정규화를 담당하는 값 객체
 */
export class Email {
  private readonly _value: string;

  constructor(value: string) {
    this.validate(value);
    this._value = this.normalize(value);
  }

  /**
   * 이메일 값 반환
   */
  get value(): string {
    return this._value;
  }

  /**
   * 이메일 형식 유효성 검사
   */
  private validate(email: string): void {
    if (!email) {
      throw new Error('이메일은 필수입니다.');
    }

    if (email.length > 254) {
      throw new Error('이메일 주소가 너무 깁니다. (최대 254자)');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('올바른 이메일 형식이 아닙니다.');
    }

    // 로컬 부분 길이 검사 (@ 앞부분)
    const [localPart] = email.split('@');
    if (localPart.length > 64) {
      throw new Error('이메일 로컬 부분이 너무 깁니다. (최대 64자)');
    }
  }

  /**
   * 이메일 정규화 (소문자 변환, 공백 제거)
   */
  private normalize(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * 도메인 부분 추출
   */
  getDomain(): string {
    return this._value.split('@')[1];
  }

  /**
   * 로컬 부분 추출 (@ 앞부분)
   */
  getLocalPart(): string {
    return this._value.split('@')[0];
  }

  /**
   * 이메일 마스킹 (개인정보 보호용)
   * 예: test@example.com -> t***@example.com
   */
  getMasked(): string {
    const [localPart, domain] = this._value.split('@');
    if (localPart.length <= 1) {
      return `*@${domain}`;
    }

    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 1);
    return `${maskedLocal}@${domain}`;
  }

  /**
   * 다른 Email 객체와 비교
   */
  equals(other: Email): boolean {
    return this._value === other._value;
  }

  /**
   * 문자열 표현
   */
  toString(): string {
    return this._value;
  }
}
