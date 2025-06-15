import { Injectable } from '@nestjs/common';
import type { SocialAuthPort } from '@authService/application/port/social-auth.port';

@Injectable()
export class DummySocialAuthService implements SocialAuthPort {
  async validate(provider: string, accessToken: string): Promise<{ socialId: string; email: string; name?: string }> {
    // 실제 환경에서는 provider별 API 호출 및 검증 필요
    // 여기서는 더미 데이터 반환
    if (provider === 'google') {
      return { socialId: 'google-123', email: 'user@google.com', name: 'Google User' };
    }
    if (provider === 'kakao') {
      return { socialId: 'kakao-456', email: 'user@kakao.com', name: 'Kakao User' };
    }
    throw new Error('지원하지 않는 소셜 로그인입니다.');
  }
}
