import type { AuthTokenRepository } from '@authService/domain/repository/auth-token.repository';
import type { AuthToken, AuthTokenType } from '@authService/domain/entity/auth-token.entity';

export class InMemoryAuthTokenRepository implements AuthTokenRepository {
  private tokens: AuthToken[] = [];

  async findById(id: string): Promise<AuthToken | null> {
    return this.tokens.find(t => t.id === id) ?? null;
  }

  async findByToken(token: string): Promise<AuthToken | null> {
    return this.tokens.find(t => t.token === token) ?? null;
  }

  async findByUserId(userId: string, type?: AuthTokenType): Promise<AuthToken[]> {
    return this.tokens.filter(t => t.userId === userId && (!type || t.type === type));
  }

  async save(authToken: AuthToken): Promise<AuthToken> {
    this.tokens.push(authToken);
    return authToken;
  }

  async delete(id: string): Promise<void> {
    this.tokens = this.tokens.filter(t => t.id !== id);
  }

  async deleteByUserId(userId: string, type?: AuthTokenType): Promise<void> {
    this.tokens = this.tokens.filter(t => t.userId !== userId || (type && t.type !== type));
  }
}
