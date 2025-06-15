import type { EmailVerificationRepository } from '@authService/domain/repository/email-verification.repository';
import type { VerifyEmailRequestDto } from '@authService/application/dto/email-verification/verify-email.dto';
import { Email } from '@authService/domain/vo/email.vo';

export class VerifyEmailUseCase {
  constructor(
    private readonly emailVerificationRepository: EmailVerificationRepository,
  ) {}

  async execute(dto: VerifyEmailRequestDto): Promise<void> {
    const email = new Email(dto.email);
    const verification = await this.emailVerificationRepository.findByEmail(email);
    if (!verification) throw new Error('인증 요청이 존재하지 않습니다.');
    const ok = verification.verify(dto.code);
    if (!ok) throw new Error('인증 코드가 일치하지 않습니다.');
    await this.emailVerificationRepository.save(verification);
  }
}
