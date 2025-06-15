import type { UserRepository } from '@authService/domain/repository/user.repository';
import type { EmailVerificationRepository } from '@authService/domain/repository/email-verification.repository';
import type { PasswordService } from '@authService/domain/service/password.service';
import type { RegisterRequestDto } from '@authService/application/dto/auth/register.dto';
import { Email } from '@authService/domain/vo/email.vo';
import { Password } from '@authService/domain/vo/password.vo';
import { User } from '@authService/domain/entity/user.entity';

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(dto: RegisterRequestDto): Promise<User> {
    // 이메일 중복 체크
    const email = new Email(dto.email);
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new Error('이미 가입된 이메일입니다.');

    // 이메일 인증 여부 확인
    const emailVerification = await this.emailVerificationRepository.findByEmail(email);
    if (!emailVerification || !emailVerification.isVerified) {
      throw new Error('이메일 인증이 필요합니다.');
    }

    // 비밀번호 해싱
    const hashed = await this.passwordService.hash(dto.password);
    const password = Password.fromHashed(hashed);

    // User 엔티티 생성 및 저장
    const user = new User(
      crypto.randomUUID(),
      email,
      password,
      null, // 소셜 타입 없음
      null, // 소셜 ID 없음
      true, // 이메일 인증 완료
      new Date(),
      new Date(),
    );
    return this.userRepository.save(user);
  }
}
