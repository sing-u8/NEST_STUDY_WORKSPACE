/**
 * PasswordService Interface
 * 비밀번호 해싱/검증을 위한 도메인 서비스 인터페이스
 */
export interface PasswordService {
  hash(plain: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}
