import type { Email } from '../vo/email.vo';
import type { Password } from '../vo/password.vo';

export type SocialType = 'google' | 'apple' | null;

/**
 * User Entity
 * 사용자 도메인 엔티티 (이메일, 비밀번호, 소셜 정보, 이메일 인증 상태 등)
 */
export class User {
  constructor(
    public readonly id: string,
    public email: Email,
    public password: Password | null,
    public socialType: SocialType,
    public socialId: string | null,
    public isEmailVerified: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  /**
   * 이메일 인증 처리
   */
  verifyEmail() {
    this.isEmailVerified = true;
  }

  /**
   * 비밀번호 변경
   */
  changePassword(newPassword: Password) {
    this.password = newPassword;
  }

  /**
   * 소셜 계정 연동
   */
  linkSocial(type: SocialType, socialId: string) {
    this.socialType = type;
    this.socialId = socialId;
  }
}
