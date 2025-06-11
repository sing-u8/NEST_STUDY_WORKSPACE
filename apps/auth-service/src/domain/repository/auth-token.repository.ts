/**
 * AuthTokenRepository Interface
 * 인증 토큰 도메인 리포지토리 인터페이스
 */
import type { AuthToken, AuthTokenType } from '../entity/auth-token.entity';

export interface AuthTokenRepository {
  findById(id: string): Promise<AuthToken | null>;
  findByToken(token: string): Promise<AuthToken | null>;
  findByUserId(userId: string, type?: AuthTokenType): Promise<AuthToken[]>;
  save(authToken: AuthToken): Promise<AuthToken>;
  delete(id: string): Promise<void>;
  deleteByUserId(userId: string, type?: AuthTokenType): Promise<void>;
}
