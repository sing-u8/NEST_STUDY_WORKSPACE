import type { UserRepository } from '@authService/domain/repository/user.repository';
import type { SocialLoginRequestDto } from '@authService/application/dto/auth/social-login.dto';
import { User, type SocialType } from '@authService/domain/entity/user.entity';
import type { SocialAuthPort } from '@authService/application/port/social-auth.port';
import { Email } from '@authService/domain/vo/email.vo';

export class SocialLoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly socialAuthService: SocialAuthPort,
  ) {}

  async execute(dto: SocialLoginRequestDto): Promise<User> {
    // 소셜 토큰 검증 및 정보 획득
    const { socialId, email, name } = await this.socialAuthService.validate(dto.provider, dto.accessToken);
    const type = dto.provider as SocialType;
    let user = await this.userRepository.findBySocial(type, socialId);
    if (!user) {
      // 최초 소셜 로그인: 회원 생성
      user = new User(
        crypto.randomUUID(),
	      new Email(email),
        null,
        type,
        socialId,
        true, // 소셜 로그인은 이메일 인증된 것으로 간주
        new Date(),
        new Date(),
      );
      user = await this.userRepository.save(user);
    }
    return user;
  }
}
