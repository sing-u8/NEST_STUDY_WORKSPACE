import type { EmailVerificationRepository } from '@authService/domain/repository/email-verification.repository';
import type { UserRepository } from '@authService/domain/repository/user.repository';
import type { SendVerificationRequestDto } from '@authService/application/dto/email-verification/send-verification.dto';
import { Email } from '@authService/domain/vo/email.vo';
import { VerificationCode } from '@authService/domain/vo/verification-code.vo';
import { EmailVerification } from '@authService/domain/entity/email-verification.entity';
import type { EmailSender } from '@authService/application/port/email-sender.port';

export class SendVerificationUseCase {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly userRepository: UserRepository,
    private readonly emailSender: EmailSender,
  ) {}

  async execute(dto: SendVerificationRequestDto): Promise<void> {
    const email = new Email(dto.email);
    // 이미 가입된 이메일인지 확인
    const user = await this.userRepository.findByEmail(email);
    if (user) throw new Error('이미 가입된 이메일입니다.');

    // 인증 정보 생성 또는 갱신
    let verification = await this.emailVerificationRepository.findByEmail(email);
    if (!verification) {
      verification = new EmailVerification(
        crypto.randomUUID(),
        email,
        new VerificationCode(),
        false,
        new Date(),
        new Date(),
      );
    } else {
      verification.regenerateCode();
    }
    await this.emailVerificationRepository.save(verification);
    // 이메일 발송
    await this.emailSender.send(email.value, verification.code.value);
  }
}
