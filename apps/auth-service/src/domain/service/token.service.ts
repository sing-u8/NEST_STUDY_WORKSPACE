/**
 * TokenService Interface
 * JWT 등 토큰 생성/검증을 위한 도메인 서비스 인터페이스
 */
export interface TokenService {
  sign(payload: Record<string, any>, options?: { expiresIn?: string | number }): Promise<string>;
  verify(token: string): Promise<Record<string, any>>;
}
