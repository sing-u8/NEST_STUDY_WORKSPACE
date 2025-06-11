/**
 * AuthToken Entity
 * 인증 토큰(액세스/리프레시 등) 관리 도메인 엔티티
 */
export type AuthTokenType = 'access' | 'refresh';

export class AuthToken {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly token: string,
    public readonly type: AuthTokenType,
    public readonly expiresAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  /**
   * 토큰 만료 여부 확인
   */
  isExpired(now: Date = new Date()): boolean {
    return now > this.expiresAt;
  }
}
