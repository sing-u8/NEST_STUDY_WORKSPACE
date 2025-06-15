import type { UserRepository } from '@authService/domain/repository/user.repository';
import type { PasswordService } from '@authService/domain/service/password.service';
import type { LoginRequestDto } from '@authService/application/dto/auth/login.dto';
import { Email } from '@authService/domain/vo/email.vo';
import type { User } from '@authService/domain/entity/user.entity';

// todo: 로그인 실패 시 예외 처리 개선 (예: 사용자 차단, 로그인 시도 제한 등) - Error만 던지지 않도록 개선 필요
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(dto: LoginRequestDto): Promise<User> {
    const email = new Email(dto.email);
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('존재하지 않는 사용자입니다.');
    if (!user.password) throw new Error('비밀번호 로그인 불가(소셜 계정)');
    const isMatch = await this.passwordService.compare(dto.password, user.password.value);
    if (!isMatch) throw new Error('비밀번호가 일치하지 않습니다.');
    if (!user.isEmailVerified) throw new Error('이메일 인증이 필요합니다.');
    return user;
  }
}
