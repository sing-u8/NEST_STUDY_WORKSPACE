/**
 * Password Value Object
 * 비밀번호의 유효성 검사, 해싱, 비교를 담당하는 값 객체
 */
export class Password {
  private readonly _hashed: string;
  private static readonly SALT_ROUNDS = 10;

  private constructor(hashed: string) {
    this._hashed = hashed;
  }

  /**
   * 비밀번호 생성 (평문 → 해시)
   * (bcrypt 등 해시 함수는 인프라 계층에서 주입받아야 함)
   */
  static async create(plain: string, hashFn: (plain: string, salt: number) => Promise<string>): Promise<Password> {
    Password.validate(plain);
    const hashed = await hashFn(plain, Password.SALT_ROUNDS);
    return new Password(hashed);
  }

  /**
   * 해시된 비밀번호로부터 객체 생성
   */
  static fromHashed(hashed: string): Password {
    return new Password(hashed);
  }

  /**
   * 비밀번호 유효성 검사 (길이, 복잡도 등)
   */
  private static validate(plain: string): void {
    if (!plain) throw new Error('비밀번호는 필수입니다.');
    if (plain.length < 8) throw new Error('비밀번호는 최소 8자 이상이어야 합니다.');
    if (!/[A-Z]/.test(plain)) throw new Error('비밀번호에 대문자가 포함되어야 합니다.');
    if (!/[a-z]/.test(plain)) throw new Error('비밀번호에 소문자가 포함되어야 합니다.');
    if (!/[0-9]/.test(plain)) throw new Error('비밀번호에 숫자가 포함되어야 합니다.');
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(plain)) throw new Error('비밀번호에 특수문자가 포함되어야 합니다.');
  }

  /**
   * 비밀번호 일치 여부 확인
   * (bcrypt 등 비교 함수는 인프라 계층에서 주입받아야 함)
   */
  async compare(plain: string, compareFn: (plain: string, hashed: string) => Promise<boolean>): Promise<boolean> {
    return compareFn(plain, this._hashed);
  }

  /**
   * 해시 값 반환
   */
  get value(): string {
    return this._hashed;
  }
}
