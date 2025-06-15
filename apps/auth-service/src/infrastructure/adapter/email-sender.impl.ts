import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { EmailSender } from '@authService/application/port/email-sender.port';

@Injectable()
export class NodemailerEmailSender implements EmailSender {
  private readonly transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'user',
      pass: process.env.SMTP_PASS || 'pass',
    },
  });

  async send(email: string, code: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@example.com',
      to: email,
      subject: '[인증] 이메일 인증 코드',
      text: `인증 코드: ${code}`,
    });
  }
}
